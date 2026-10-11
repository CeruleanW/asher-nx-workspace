
  const path = require('path');
  const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
  const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
  module.exports = {
    paths: (paths) => {
      // Yarn can install dependencies off the workspace's filesystem.
      if (process.env.YARN_MODULES_FOLDER) {
        paths.appNodeModules = path.resolve(process.env.YARN_MODULES_FOLDER);
        paths.appWebpackCache = path.join(paths.appNodeModules, '.cache/portfolio');
        paths.appTsBuildInfoFile = path.join(paths.appWebpackCache, 'tsconfig.tsbuildinfo');
      }
      return paths;
    },
    webpack: {
      configure: (config) => {
        if (process.env.YARN_MODULES_FOLDER) {
          const modulesFolder = path.resolve(process.env.YARN_MODULES_FOLDER);
          const ts = require('typescript');
          const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
          const tsconfig = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
          const { options } = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, __dirname);
          const typeChecker = config.plugins.find(
            (plugin) => plugin.constructor.name === 'ForkTsCheckerWebpackPlugin'
          );
          if (typeChecker) {
            const compilerOptions = typeChecker.options.typescript.configOverwrite.compilerOptions;
            compilerOptions.baseUrl = options.baseUrl;
            compilerOptions.typeRoots = [path.join(modulesFolder, '@types')];
            compilerOptions.paths = {
              ...options.paths,
              '*': [path.join(modulesFolder, '@types/*'), path.join(modulesFolder, '*')],
            };
          }
        }
        // Remove guard against importing modules outside of `src`.
        // Needed for workspace projects.
        config.resolve.plugins = config.resolve.plugins.filter(
          (plugin) => !(plugin instanceof ModuleScopePlugin)
        );
        // Add support for importing workspace projects.
        config.resolve.plugins.push(
          new TsConfigPathsPlugin({
            configFile: path.resolve(__dirname, 'tsconfig.json'),
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            mainFields: ['module', 'main'],
          })
        );

        // Replace include option for babel loader with exclude
        // so babel will handle workspace projects as well.
        config.module.rules[1].oneOf.forEach((r) => {
          if (r.loader && r.loader.indexOf('babel') !== -1) {
            r.exclude = /node_modules/;
            delete r.include;
          }
        });
        return config;
      },
    },
    jest: {
      configure: (config) => {
        config.resolver = '@nrwl/jest/plugins/resolver';
        return config;
      },
    },
  };
