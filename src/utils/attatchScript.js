/**
 * Insert & load the script.
 * Handle onload & onerror callbacks.
 *
 * @param {string} src - Source url of the script to be loaded.
 * @param {object} attrs - Attributes to be added to the script tag.
 * @param {HTMLElement} parentNode - Node to which the script tag is appended.
 */
export const attatchScript = (src, attrs, parentNode) =>
  new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error(`No url for package supplied`));
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = src;

    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error(`Failed to load ${src}`));
    };

    const node = parentNode || document.body;
    node.appendChild(script);
  });
