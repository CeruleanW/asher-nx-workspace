const path = require('path');
const { spawn } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const appRoot = path.join(workspaceRoot, 'apps/portfolio');
const action = process.argv[2] || 'start';
const env = { ...process.env };

if (env.YARN_MODULES_FOLDER) {
  const modulesFolder = path.resolve(workspaceRoot, env.YARN_MODULES_FOLDER);
  env.YARN_MODULES_FOLDER = modulesFolder;
  env.NODE_PATH = [modulesFolder, env.NODE_PATH].filter(Boolean).join(path.delimiter);
  process.env.NODE_PATH = env.NODE_PATH;
  require('module').Module._initPaths();
}

if (action === 'build') {
  env.BUILD_PATH = env.BUILD_PATH || path.join(workspaceRoot, 'dist/apps/portfolio');
}

const cracoRoot = path.dirname(require.resolve('@craco/craco/package.json'));
const child = spawn(
  process.execPath,
  [path.join(cracoRoot, 'dist/bin/craco.js'), action, ...process.argv.slice(3)],
  { cwd: appRoot, env, stdio: 'inherit' }
);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
