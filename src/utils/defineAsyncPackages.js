/**
 * This function is to be invoked prior to any others.
 * We set the package config to a window variable enabling it to be
 * used up when we wish to obtain packages later.
 *
 * @param {Object} packagesData - Config to be used to load various packages.
 */

export const defineAsyncPackages = (packagesData = {}) => {
  window.reactAsyncPackagesConfig = {};
  window.reactAsyncPackagesConfig.global = {};

  if (!Object.keys(packagesData).length) {
    throw new Error('Package config must be supplied');
  }

  Object.keys(packagesData).forEach((name) => {
    window.reactAsyncPackagesConfig[name] = {
      url: packagesData[name].url || '', // handle error for no src later on - as others may have it.
      nativeAlias: packagesData[name].nativeAlias || '',
      attributes: packagesData[name].attributes || {},
      onLoad: packagesData[name].onLoad || null,
      onError: packagesData[name].onError || null,
    };
  });

  window.reactAsyncPackagesConfig.global = {
    attributes: packagesData.global ? packagesData.global.attributes : {},
    onLoad: packagesData.global ? packagesData.global.onLoad : null,
    onError: packagesData.global ? packagesData.global.onError : null,
  };
};

export default defineAsyncPackages;
