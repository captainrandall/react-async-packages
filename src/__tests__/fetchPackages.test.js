import { fetchPackages } from '../utils/fetchPackages';

jest.mock('../utils/attatchScript');

describe('fetchPackages', () => {
  it('verifies a package is loaded', () => {
    window.reactAsyncPackagesConfig = {
      test1: {
        url: 'test1script.com',
        nativeAlias: 'Test1',
      },
      global: {},
    };

    expect.assertions(1);
    return expect(fetchPackages(['test1'])).resolves.toEqual({ test1: true });
  });

  it('verifies multiple packages are loaded', () => {
    window.reactAsyncPackagesConfig = {
      test1: {
        url: 'test1script.com',
        nativeAlias: 'Test1',
      },
      test2: {
        url: 'test2script.com',
        nativeAlias: 'Test2',
      },
      test3: {
        url: 'test3script.com',
        nativeAlias: 'Test3',
      },
      global: {},
    };

    expect.assertions(1);
    return expect(fetchPackages(['test1', 'test2', 'test3'])).resolves.toEqual({
      test1: true,
      test2: true,
      test3: true,
    });
  });

  it('Tests failOnError in package config', () => {
    window.reactAsyncPackagesConfig = {
      test1: {
        url: 'invalidUrl.com',
        nativeAlias: 'Test1',
        failOnError: true,
      },
      global: {},
    };
    expect.assertions(1);
    return expect(fetchPackages(['test1'])).rejects.toThrow(
      'Failed to load invalidUrl.com',
    );
  });

  it('tests failOnError in global config', () => {
    window.reactAsyncPackagesConfig = {
      test1: {
        url: 'invalidUrl2.com',
        nativeAlias: 'Test1',
      },
      global: {
        failOnError: true,
      },
    };
    expect.assertions(1);
    return expect(fetchPackages(['test1'])).rejects.toThrow(
      'Failed to load invalidUrl2.com',
    );
  });

  it('tests failOnError in global config', () => {
    window.reactAsyncPackagesConfig = {
      test1: {
        url: '',
        nativeAlias: 'Test1',
      },
      global: {
        failOnError: true,
      },
    };
    expect.assertions(1);
    return expect(fetchPackages(['test1'])).rejects.toThrow(
      'No url for package supplied',
    );
  });

  it('Throws error as no package config exists', () => {
    delete window.reactAsyncPackagesConfig;

    expect.assertions(1);
    return expect(fetchPackages(['test1'])).rejects.toThrow(
      'No package config has been defined',
    );
  });
});
