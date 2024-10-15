const { resolve } = require("path");

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTSconfigPathsToAlias({ tsconfigPath = "./tsconfig.json", webpackConfigBasePath = __dirname } = {}) {
  const { paths } = require(tsconfigPath).compilerOptions;

  return Object.keys(paths).reduce((accamulator, path) => {
    const key = path.replace("/*", "");
    const value = resolve(webpackConfigBasePath, paths[path][0].replace("/*", "").replace("*", ""));

    return { ...accamulator, [key]: value };
  }, {});
}

module.exports = { resolveTSconfigPathsToAlias };
