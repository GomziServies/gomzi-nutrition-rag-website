import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContentCompiler } from './website-content-compiler.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { fields } = createContentCompiler(root);
const settings = JSON.parse(fs.readFileSync(path.join(root, 'src/content/website-settings.json'), 'utf8'));
fields['website.branding'] = { group: 'Website / Branding', label: 'Brand and colours', type: 'collection', default: settings.branding };
fields['website.contact'] = { group: 'Website / Contact details', label: 'Contact and social links across the website', type: 'collection', default: settings.contact };
fields['website.seo'] = { group: 'Website / SEO defaults', label: 'Default search and social sharing information', type: 'collection', default: { title: 'Gomzi Supplement by RAG | FSSAI-Certified Whey Protein, Creatine & Supplements India', description: 'Lab-tested whey protein, creatine and sports supplements. FSSAI certified with free shipping across India.', image: '/images/banner-web-view.webp' } };
fields['homepage.sections'] = { group: 'Home / Layout', label: 'Homepage section order and visibility', type: 'collection', default: ['hero', 'categories', 'deals', 'flash', 'static-banner', 'bestsellers', 'combos', 'promo-banner', 'whey', 'stacks', 'nutrition-banner', 'creatine', 'why', 'reviews', 'seo'].map(id => ({ id, enabled: true })) };
const schema = { schemaVersion: 1, fields };
for (const relative of ['src/content/website-content.schema.json', 'website-content-update/api/src/website-content/schema.json']) {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(schema, null, 2) + '\n');
}
console.log(`Registered ${Object.keys(fields).length} editable fields across ${new Set(Object.values(fields).map(field => field.group)).size} content groups.`);
