const fs = require('node:fs');
const path = require('node:path');
const admin = 'D:/FG Group/RAG/gomzi-nutrition-rag-admin';
const stage = path.resolve('admin-deals-update');
const ts = require(path.join(admin, 'node_modules/typescript'));
const manifest = JSON.parse(fs.readFileSync(path.join(stage, 'manifest.json'), 'utf8'));
const normalize = value => path.resolve(value).replaceAll('\\', '/').toLowerCase();
const overrides = new Map(manifest.map(entry => [normalize(path.join(admin, entry.path)), fs.readFileSync(path.join(stage, entry.path), 'utf8')]));
const directories = new Set();
for (const entry of manifest) {
  let directory = path.dirname(path.join(admin, entry.path));
  while (normalize(directory).startsWith(normalize(admin))) { directories.add(normalize(directory)); directory = path.dirname(directory); }
}
const configFile = ts.readConfigFile(path.join(admin, 'tsconfig.json'), ts.sys.readFile);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, admin);
const host = ts.createCompilerHost(config.options);
const readFile = host.readFile.bind(host), fileExists = host.fileExists.bind(host), directoryExists = host.directoryExists.bind(host);
host.readFile = file => overrides.get(normalize(file)) ?? readFile(file);
host.fileExists = file => overrides.has(normalize(file)) || fileExists(file);
host.directoryExists = directory => directories.has(normalize(directory)) || directoryExists(directory);
const files = [...new Set([...config.fileNames, ...manifest.map(entry => path.join(admin, entry.path))])];
const program = ts.createProgram(files, { ...config.options, noEmit: true, incremental: false }, host);
const diagnostics = ts.getPreEmitDiagnostics(program);
const relevant = diagnostics.filter(diagnostic => diagnostic.file && overrides.has(normalize(diagnostic.file.fileName)));
if (relevant.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(relevant, { getCanonicalFileName: file => file, getCurrentDirectory: () => admin, getNewLine: () => '\n' }));
  process.exitCode = 1;
} else console.log(`PASS staged admin files: no TypeScript errors (${diagnostics.length} diagnostics elsewhere in the existing project).`);
