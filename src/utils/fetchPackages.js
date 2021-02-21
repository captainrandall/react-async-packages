import { loadFromSrc } from './loadFromSrc';

/**
 * Iterate through list of package references & run method to load them from src.
 * Resolve promise after iteration has occured on last package.
 * Handle onError & onLoad callBacks.
 *
 * @param {string[]} packages
 */
export const fetchPackages = (packages) => {
  if (!window.reactAsyncPackagesConfig) {
    return Promise.reject(new Error('No package config has been defined'));
  }

  return new Promise((resolve, reject) => {
    const loadedPackages = {};

    packages.forEach((packageName, index) => {
      const packageConfig = window.reactAsyncPackagesConfig[packageName];
      const globalPackageConfig = window.reactAsyncPackagesConfig.global;
      const isFinalPackage = index === packages.length - 1;
      const onError = packageConfig.onError || globalPackageConfig.onError;
      const onLoad = packageConfig.onLoad || globalPackageConfig.onLoad;

      loadFromSrc(
        packageConfig.url,
        packageConfig.attributes,
        packageConfig.parentNode || globalPackageConfig.parentNode,
      )
        .then(() => {
          loadedPackages[packageName] = window[packageConfig.nativeAlias];

          if (onLoad) {
            onLoad(window[packageConfig.nativeAlias]);
          }
          if (isFinalPackage) {
            resolve(loadedPackages);
          }
        })
        .catch((error) => {
          if (onError) {
            onError(error);
          } else {
            console.error(error);
          }
          if (packageConfig.failOnError || globalPackageConfig.failOnError) {
            reject(new Error(error));
          }
          if (isFinalPackage) {
            resolve(loadedPackages);
          }
        });
    });
  });
};
