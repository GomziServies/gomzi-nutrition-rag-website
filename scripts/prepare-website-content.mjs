import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const stage = path.join(root, 'website-content-update');
const projects = { api: 'D:/FG Group/RAG/gomzi-nutrition-rag-api', admin: 'D:/FG Group/RAG/gomzi-nutrition-rag-admin' };
const manifest = [];
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function register(project, relative) {
  const target = path.join(projects[project], relative);
  manifest.push({ project, path: relative, sha256: fs.existsSync(target) ? hash(fs.readFileSync(target)) : null });
}
function edit(project, relative, update) {
  const original = fs.readFileSync(path.join(projects[project], relative), 'utf8');
  const newline = original.includes('\r\n') ? '\r\n' : '\n';
  const next = update(original, newline);
  const target = path.join(stage, project, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, next);
  register(project, relative);
}
for (const name of ['schema.json', 'validation.js', 'model.js', 'controller.js']) register('api', `src/website-content/${name}`);
register('admin', 'src/app/pages/gomzi-nutrition/website-content/WebsiteContentManage.tsx');
edit('api', 'src/routes/admin.routes.js', (text, nl) => {
  if (text.includes("'/website-content'")) return text;
  const marker = '// -- Authorized Routes --';
  if (!text.includes(marker)) throw new Error('Admin authentication route marker changed.');
  return text.replace(marker, marker + nl + "const websiteContent = require('../website-content/controller');" + nl + "adminRoute.get('/website-content', websiteContent.admin);" + nl + "adminRoute.post('/website-content', websiteContent.manage);" + nl);
});
edit('api', 'src/routes/public.routes.js', (text, nl) => {
  if (text.includes("'/website-content'")) return text;
  const marker = '// -- Routes --';
  if (!text.includes(marker)) throw new Error('Public route marker changed.');
  return text.replace(marker, marker + nl + "publicRoutes.get('/website-content', require('../website-content/controller').public);" + nl);
});
edit('admin', 'src/app/routing/GomziNutritionPrivateRoutes.tsx', (text, nl) => {
  if (!text.includes("import WebsiteContentManage")) text = text.replace("import DealManage from '../pages/gomzi-nutrition/deals/deal-manage'", "import DealManage from '../pages/gomzi-nutrition/deals/deal-manage'" + nl + "import WebsiteContentManage from '../pages/gomzi-nutrition/website-content/WebsiteContentManage'");
  if (!text.includes("path='/website-content'")) text = text.replace("<Route path='/deals' element={<DealManage />} />", "<Route path='/website-content' element={<WebsiteContentManage />} />" + nl + "\t\t\t\t<Route path='/deals' element={<DealManage />} />");
  if (!text.includes("path='/website-content'")) throw new Error('Admin route insertion failed.');
  return text;
});
for (const menu of ['GomziNutritionAsideMenuItems', 'GomziNutritionLoginAsideMenuItems']) edit('admin', `src/_metronic/layout/components/aside/components/${menu}.tsx`, (text, nl) => {
  if (text.includes("to='/rag/website-content'")) return text;
  const full = menu === 'GomziNutritionAsideMenuItems';
  const marker = full ? "\t\t\t\t<AsideMenuItem" + nl + "\t\t\t\t\tto='/rag/hero-banner'" : "\t\t\t<AsideMenuItem" + nl + "\t\t\t\tto='/rag/hero-banner'";
  if (!text.includes(marker)) throw new Error(`Content menu changed: ${menu}`);
  const indent = full ? '\t\t\t\t' : '\t\t\t';
  const item = [indent + '<AsideMenuItem', indent + "\tto='/rag/website-content'", indent + "\ttitle='Website Content'", indent + (full ? '\thasBullet={true}' : '\tIcon={faImage}'), indent + '/>'].join(nl);
  return text.replace(marker, item + nl + marker);
});
fs.writeFileSync(path.join(stage, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${manifest.length} API and admin files; external projects have not been modified.`);
