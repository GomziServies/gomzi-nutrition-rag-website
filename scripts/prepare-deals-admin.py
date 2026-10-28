from pathlib import Path
import hashlib, json, difflib
admin = Path('D:/FG Group/RAG/gomzi-nutrition-rag-admin')
stage = Path('admin-deals-update')
manifest = []
new_page = 'src/app/pages/gomzi-nutrition/deals/deal-manage.tsx'
if (admin / new_page).exists():
    raise SystemExit('A Deals page already exists; review before applying.')
manifest.append({'path': new_page, 'sha256': None})
patches = []

def stage_edit(relative, edit):
    original = (admin / relative).read_bytes()
    content = original.decode('utf-8')
    newline = '\r\n' if '\r\n' in content else '\n'
    updated = edit(content, newline)
    if updated == content:
        raise RuntimeError('No change prepared for ' + relative)
    target = stage / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(updated.encode('utf-8'))
    manifest.append({'path': relative, 'sha256': hashlib.sha256(original).hexdigest()})
    patches.extend(difflib.unified_diff(content.splitlines(True), updated.splitlines(True), fromfile=relative, tofile=relative))

def route_edit(s, nl):
    anchor = "import HeroBannerManage from '../pages/gomzi-nutrition/hero-banner/hero-banner-manage'"
    if anchor not in s: raise RuntimeError('Hero route import changed')
    s = s.replace(anchor, anchor + nl + "import DealManage from '../pages/gomzi-nutrition/deals/deal-manage'")
    marker = '\t\t\t\t<Route' + nl + "\t\t\t\t\tpath='/hero-banner'"
    if marker not in s: raise RuntimeError('Hero route changed')
    return s.replace(marker, '\t\t\t\t<Route path=\'/deals\' element={<DealManage />} />' + nl + marker, 1)

stage_edit('src/app/routing/GomziNutritionPrivateRoutes.tsx', route_edit)
for relative, indent, icon in [
    ('src/_metronic/layout/components/aside/components/GomziNutritionAsideMenuItems.tsx', '\t\t\t\t', False),
    ('src/_metronic/layout/components/aside/components/GomziNutritionLoginAsideMenuItems.tsx', '\t\t\t', True),
]:
    def menu_edit(s, nl, indent=indent, icon=icon):
        marker = indent + '<AsideMenuItem' + nl + indent + "\tto='/rag/blogs'"
        if marker not in s: raise RuntimeError('Menu anchor changed')
        lines = [indent + '<AsideMenuItem', indent + "\tto='/rag/deals'", indent + "\ttitle='Homepage Deals'", indent + ('\tIcon={faImage}' if icon else '\thasBullet={true}'), indent + '/>']
        return s.replace(marker, nl.join(lines) + nl + marker, 1)
    stage_edit(relative, menu_edit)
(stage / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
(stage / 'admin-integration.patch').write_text(''.join(patches), encoding='utf-8')
print('Prepared new Deals editor, route and both admin navigation menus.')
