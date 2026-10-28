import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parseSync, traverse, types as t, transformFromAstSync } from '@babel/core';

const collectionNames = new Set(['PRIMARY_LINKS', 'POPULAR_SEARCH_TAGS', 'MEGA_CATEGORIES', 'TABS', 'STACKS', 'REVIEWS', 'faqs', 'allFAQData', 'timeline', 'nutritionBenefits', 'founders', 'advantages', 'ingredients', 'benefits', 'ambassadors', 'slides', 'standards', 'highlights', 'B2B_BENEFITS', 'WHOLESALE_TIERS', 'WHOLESALE_FAQS', 'BUSINESS_TYPE_OPTIONS', 'ESTIMATED_VOLUME_OPTIONS', 'WHY_GOMZI_FEATURES', 'SEO_ACCORDION_ITEMS', 'FITNESS_GOALS', 'blogs', 'categoryConfig', 'CATEGORY_SHOWCASES']);
const editableAttributes = new Set(['head', 'title', 'description', 'subtitle', 'subHeading', 'label', 'placeholder', 'alt', 'src', 'href', 'to', 'poster', 'image', 'aria-label']);
const rawTextTags = new Set(['style', 'script', 'option', 'textarea', 'title']);
const normalize = file => file.replaceAll('\\', '/');
const hash = value => createHash('sha256').update(value).digest('hex').slice(0, 12);
const humanize = value => value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ').replace(/\bHk\b/g, '').trim();
const groupFor = file => {
  const name = humanize(path.basename(file).replace(/\.[jt]sx?$/, '').replace(/^Hk/, ''));
  if (file.endsWith('/HkHeader.jsx')) return 'Global / Navigation and header';
  if (file.endsWith('/HkFooter.jsx')) return 'Global / Footer';
  if (file.endsWith('/HkTopBar.jsx')) return 'Global / Announcement bar';
  if (file.endsWith('/blogs.js')) return 'Pages / Blog / Articles';
  if (file.endsWith('/categoryConfig.js')) return 'Shop / Category pages';
  if (file.endsWith('/homeProducts.js')) return 'Home / Trust and guides';
  if (file.endsWith('/Landing.jsx')) return 'Home / General';
  if (file.includes('/healthkart/')) return `Home / ${name}`;
  if (file.includes('/checkout/')) return `Checkout / ${name}`;
  if (file.includes('/category/')) return `Shop / ${name}`;
  if (file.includes('/Auth/') || file.includes('/auth/')) return `Account / ${name}`;
  if (file.includes('/Profile/')) return `Account / ${name}`;
  if (file.includes('/pages/')) return `Pages / ${name}`;
  return `Website sections / ${name}`;
};
const keyFor = (file, kind, value) => `${file.replace(/^src\//, '').replace(/\.[jt]sx?$/, '').replaceAll('/', '.')}.${kind}.${hash(value)}`;

function textValue(value) {
  const lines = value.split(/\r\n|\n|\r/);
  let last = 0;
  lines.forEach((line, i) => { if (/[^ \t]/.test(line)) last = i; });
  return lines.map((line, i) => {
    let clean = line.replaceAll('\t', ' ');
    if (i > 0) clean = clean.replace(/^ +/, '');
    if (i < lines.length - 1) clean = clean.replace(/ +$/, '');
    return clean ? clean + (i < last ? ' ' : '') : '';
  }).join('');
}

function literal(node) {
  if (t.isStringLiteral(node) || t.isNumericLiteral(node) || t.isBooleanLiteral(node)) return node.value;
  if (t.isNullLiteral(node)) return null;
  if (t.isTemplateLiteral(node) && !node.expressions.length) return node.quasis[0].value.cooked;
  if (t.isArrayExpression(node)) return node.elements.map(literal);
  if (t.isObjectExpression(node)) return Object.fromEntries(node.properties.map(property => {
    if (!t.isObjectProperty(property) || property.computed) throw new Error('Not content data');
    const name = property.key.name ?? property.key.value;
    // Icons remain React components in the source; content edits preserve them.
    if (name === 'icon' && !t.isStringLiteral(property.value)) return null;
    return [name, literal(property.value)];
  }).filter(Boolean));
  throw new Error('Not static content');
}

export function createContentCompiler(root) {
  const sources = new Map();
  const fields = {};
  const collections = new Map();
  function addField(file, kind, value, attribute) {
    const key = keyFor(file, kind, typeof value === 'string' ? value : kind);
    const type = attribute && ['src', 'poster', 'image'].includes(attribute) ? 'asset' : attribute && ['href', 'to'].includes(attribute) ? 'link' : kind === 'collection' ? 'collection' : 'text';
    fields[key] = { source: file, group: groupFor(file), label: kind === 'collection' ? humanize(attribute) : `${attribute ? humanize(attribute) + ': ' : ''}${String(value).trim().slice(0, 95)}`, type, default: value };
    return key;
  }
  function scan(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) { if (!['content', 'assets'].includes(entry.name)) scan(absolute); continue; }
      if (!/\.(jsx|js)$/.test(entry.name)) continue;
      const file = normalize(path.relative(root, absolute));
      const source = fs.readFileSync(absolute, 'utf8');
      const ast = parseSync(source, { filename: absolute, configFile: false, babelrc: false, parserOpts: { plugins: ['jsx'] } });
      sources.set(file, { source, ast });
      traverse(ast, {
        JSXElement(p) {
          if (p.node.openingElement.name.name !== 'section') return;
          const key = keyFor(file, 'section', String(p.node.start));
          let label = '';
          t.traverseFast(p.node, node => { if (!label && t.isJSXText(node) && textValue(node.value).trim()) label = textValue(node.value).trim().slice(0, 70); });
          fields[key] = { source: file, group: groupFor(file), label: `Show section: ${label || 'Content section'}`, type: 'toggle', default: true };
        },
        ArrayExpression(p) {
          if (!p.parentPath.isMemberExpression() || p.parent.property?.name !== 'map') return;
          try {
            const data = literal(p.node);
            if (!data.length || data.every(item => typeof item === 'number')) return;
            const key = keyFor(file, 'items', JSON.stringify(data));
            fields[key] = { source: file, group: groupFor(file), label: 'Repeated items', type: 'collection', default: data };
          } catch { /* Dynamic lists stay connected to their own APIs. */ }
        },
        JSXExpressionContainer(p) {
          if (p.parentPath.isJSXAttribute() || rawTextTags.has(p.parent?.openingElement?.name?.name)) return;
          function collect(node) {
            if (t.isStringLiteral(node) && node.value.trim()) addField(file, 'text', node.value);
            else if (t.isConditionalExpression(node)) { collect(node.consequent); collect(node.alternate); }
            else if (t.isLogicalExpression(node)) collect(node.right);
          }
          collect(p.node.expression);
        },
        VariableDeclarator(p) {
          if (!t.isIdentifier(p.node.id) || !collectionNames.has(p.node.id.name)) return;
          try {
            const data = literal(p.node.init);
            if (!data || typeof data !== 'object') return;
            // The variable name makes collection keys stable when defaults change.
            const key = `${file.replace(/^src\//, '').replace(/\.[jt]sx?$/, '').replaceAll('/', '.')}.data.${p.node.id.name}`;
            fields[key] = { source: file, group: groupFor(file), label: humanize(p.node.id.name), type: 'collection', default: data };
            collections.set(`${file}:${p.node.id.name}`, key);
          } catch { /* Operational values are deliberately excluded. */ }
        },
        JSXText(p) {
          if (rawTextTags.has(p.parent?.openingElement?.name?.name)) return;
          const value = textValue(p.node.value);
          if (!value.trim() || !/\p{L}|\p{N}/u.test(value)) return;
          addField(file, 'text', value);
        },
        JSXAttribute(p) {
          const name = p.node.name.name;
          if (!editableAttributes.has(name)) return;
          try { const value = literal(t.isJSXExpressionContainer(p.node.value) ? p.node.value.expression : p.node.value); if (typeof value === 'string' && value.trim()) addField(file, `attribute-${name}`, value, name); } catch { /* Dynamic product/customer data stays live. */ }
        },
      });
    }
  }
  scan(path.join(root, 'src'));
  const active = new Set();
  const include = file => {
    if (active.has(file) || !sources.has(file)) return;
    active.add(file);
    const follow = target => {
      if (!target?.startsWith('.')) return;
      const base = normalize(path.join(path.dirname(file), target));
      const resolved = [base, `${base}.jsx`, `${base}.js`, `${base}/index.jsx`, `${base}/index.js`].find(candidate => sources.has(candidate));
      if (resolved) include(resolved);
    };
    traverse(sources.get(file).ast, {
      ImportDeclaration(p) {
        if (!p.node.specifiers.length || p.node.specifiers.some(specifier => p.scope.getBinding(specifier.local.name)?.referenced)) follow(p.node.source.value);
      },
      CallExpression(p) { if (p.node.callee.type === 'Import' && t.isStringLiteral(p.node.arguments[0])) follow(p.node.arguments[0].value); },
      ExportNamedDeclaration(p) { if (p.node.source) follow(p.node.source.value); },
      ExportAllDeclaration(p) { follow(p.node.source.value); },
    });
  };
  include('src/main.jsx');
  for (const [key, field] of Object.entries(fields)) if (!active.has(field.source)) delete fields[key];
  for (const [name, key] of collections) if (!fields[key]) collections.delete(name);

  function transform(source, absolute) {
    const file = normalize(path.relative(root, absolute.split('?')[0]));
    if (!sources.has(file) || !active.has(file)) return null;
    const ast = parseSync(source, { filename: absolute, configFile: false, babelrc: false, parserOpts: { plugins: ['jsx'] } });
    let changed = false;
    const hooks = new Map();
    const componentScope = p => {
      let parent = p.findParent(candidate => candidate.isFunction() && /^[A-Z]/.test(candidate.node.id?.name || (candidate.parentPath.isVariableDeclarator() ? candidate.parentPath.node.id.name : '')));
      if (!parent) return null;
      if (!hooks.has(parent.node)) {
        const id = parent.scope.generateUidIdentifier('websiteContent');
        if (!t.isBlockStatement(parent.node.body)) parent.node.body = t.blockStatement([t.returnStatement(parent.node.body)]);
        parent.node.body.body.unshift(t.variableDeclaration('const', [t.variableDeclarator(id, t.callExpression(t.identifier('__useWebsiteContent'), []))]));
        hooks.set(parent.node, id);
      }
      return hooks.get(parent.node);
    };
    // Resolve editable collections where they are consumed, so module data never becomes a mutable singleton.
    traverse(ast, {
      ArrayExpression(p) {
        if (!p.parentPath.isMemberExpression() || p.parent.property?.name !== 'map') return;
        try {
          const data = literal(p.node);
          const key = keyFor(file, 'items', JSON.stringify(data));
          if (!fields[key]) return;
          const context = componentScope(p);
          if (!context) return;
          p.replaceWith(t.callExpression(t.memberExpression(t.cloneNode(context), t.identifier('get')), [t.stringLiteral(key), t.cloneNode(p.node, true)]));
          p.skip(); changed = true;
        } catch { /* Not an editable list. */ }
      },
      ReferencedIdentifier(p) {
        const binding = p.scope.getBinding(p.node.name);
        if (!binding) return;
        let key;
        if (binding.path.isVariableDeclarator()) key = collections.get(`${file}:${p.node.name}`);
        if (binding.path.isImportSpecifier() || binding.path.isImportDefaultSpecifier()) {
          const imported = binding.path.node.imported?.name || 'categoryConfig';
          const importPath = binding.path.parent.source.value;
          let resolved = normalize(path.join(path.dirname(file), importPath));
          if (!/\.[jt]sx?$/.test(resolved)) resolved += '.js';
          key = collections.get(`${resolved}:${imported}`);
        }
        if (!key) return;
        const context = componentScope(p);
        if (!context) return;
        p.replaceWith(t.callExpression(t.memberExpression(t.cloneNode(context), t.identifier('get')), [t.stringLiteral(key), t.cloneNode(p.node)]));
        p.skip();
        changed = true;
      },
    });
    traverse(ast, {
      JSXExpressionContainer(p) {
        if (p.parentPath.isJSXAttribute() || rawTextTags.has(p.parent?.openingElement?.name?.name)) return;
        function replace(node) {
          if (t.isStringLiteral(node) && node.value.trim()) {
            changed = true;
            return t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier('__CmsText'), [t.jsxAttribute(t.jsxIdentifier('contentKey'), t.stringLiteral(keyFor(file, 'text', node.value))), t.jsxAttribute(t.jsxIdentifier('fallback'), t.jsxExpressionContainer(t.cloneNode(node)))], true), null, [], true);
          }
          if (t.isConditionalExpression(node)) { node.consequent = replace(node.consequent); node.alternate = replace(node.alternate); }
          else if (t.isLogicalExpression(node)) node.right = replace(node.right);
          return node;
        }
        p.node.expression = replace(p.node.expression);
      },
      JSXText(p) {
        if (rawTextTags.has(p.parent?.openingElement?.name?.name)) return;
        const value = textValue(p.node.value);
        if (!value.trim() || !/\p{L}|\p{N}/u.test(value)) return;
        const key = keyFor(file, 'text', value);
        p.replaceWith(t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier('__CmsText'), [t.jsxAttribute(t.jsxIdentifier('contentKey'), t.stringLiteral(key)), t.jsxAttribute(t.jsxIdentifier('fallback'), t.jsxExpressionContainer(t.stringLiteral(value)))], true), null, [], true));
        changed = true;
      },
      JSXElement: { exit(p) {
        if (p.node.openingElement.name.name?.startsWith('__Cms')) return;
        const managed = [];
        for (const attribute of p.node.openingElement.attributes) {
          if (!t.isJSXAttribute(attribute) || !editableAttributes.has(attribute.name.name)) continue;
          try {
            const value = literal(t.isJSXExpressionContainer(attribute.value) ? attribute.value.expression : attribute.value);
            if (typeof value === 'string' && value.trim()) managed.push(t.objectProperty(t.stringLiteral(attribute.name.name), t.stringLiteral(keyFor(file, `attribute-${attribute.name.name}`, value))));
          } catch { /* Preserve dynamic data. */ }
        }
        const visibilityKey = p.node.openingElement.name.name === 'section' ? keyFor(file, 'section', String(p.node.start)) : null;
        if (!managed.length && !visibilityKey) return;
        const original = p.node.openingElement.name;
        const asExpression = t.isJSXIdentifier(original) ? (/^[a-z]/.test(original.name) ? t.stringLiteral(original.name) : t.identifier(original.name)) : t.memberExpression(t.identifier(original.object.name), t.identifier(original.property.name));
        p.node.openingElement.name = t.jsxIdentifier('__CmsElement');
        if (p.node.closingElement) p.node.closingElement.name = t.jsxIdentifier('__CmsElement');
        p.node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('as'), t.jsxExpressionContainer(asExpression)), t.jsxAttribute(t.jsxIdentifier('contentFields'), t.jsxExpressionContainer(t.objectExpression(managed))));
        if (visibilityKey) p.node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('contentVisibilityKey'), t.stringLiteral(visibilityKey)));
        changed = true;
      } },
    });
    if (!changed) return null;
    ast.program.body.unshift(t.importDeclaration(['CmsText', 'CmsElement', 'useWebsiteContent'].map((name, i) => t.importSpecifier(t.identifier(['__CmsText', '__CmsElement', '__useWebsiteContent'][i]), t.identifier(name))), t.stringLiteral('/src/content/WebsiteContent.jsx')));
    return transformFromAstSync(ast, source, { filename: absolute, configFile: false, babelrc: false, sourceMaps: true, ast: false });
  }
  return { fields, transform };
}

export function websiteContentPlugin(root) {
  const compiler = createContentCompiler(root);
  return { name: 'gomzi-website-content', enforce: 'pre', transform(source, id) { return compiler.transform(source, id); } };
}
