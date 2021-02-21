export const attatchScript = (src) => {
  if (!src) {
    return Promise.reject(new Error('No url for package supplied'));
  }
  switch (src) {
    case 'test1script.com':
      window.Test1 = true;
      break;
    case 'test2script.com':
      window.Test2 = true;
      break;
    case 'test3script.com':
      window.Test3 = true;
      break;

    default:
      return Promise.reject(new Error(`Failed to load ${src}`));
  }

  return Promise.resolve();
};
