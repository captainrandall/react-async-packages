import { attatchScript } from './attatchScript';

/**
 * Entry point for obtaining package from it's src.
 * We only fetch the script if it is not already loaded.
 *
 * @param {string} src - Source url of the script to be loaded.
 * @param {object} [attrs=object] - Attributes to be added to the script tag.
 * @param {HTMLElement} [parentNode=null] - Node to which the script tag is appended.
 */
export const loadFromSrc = (src, attrs = {}, parentNode = null) => {
  if (!window.requiredAsyncScripts) {
    window.requiredAsyncScripts = [];
  }
  if (window.requiredAsyncScripts.includes(src)) {
    return Promise.resolve();
  }
  window.requiredAsyncScripts.push(src);

  return attatchScript(src, attrs, parentNode);
};

export default loadFromSrc;
