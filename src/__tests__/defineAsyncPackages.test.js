import { defineAsyncPackages } from '../utils/defineAsyncPackages';

describe('defineAsyncPackages', () => {
  it('Tests full config object is set correctly', () => {
    const config = {
      test1: {
        url: 'test1script.com',
        nativeAlias: 'Test1',
        attributes: { foo: 'bar' },
        onLoad: () => 'loadSuccess',
        onError: () => 'failed',
      },
      global: {
        attributes: { foo: 'bar' },
        onLoad: () => 'loadSuccess',
        onError: () => 'failed',
      },
    };
    defineAsyncPackages(config);

    expect(window.reactAsyncPackagesConfig).toStrictEqual(config);
  });

  it('Tests a partial config gets set with default values', () => {
    const config = {
      test1: {
        url: 'test1script.com',
        nativeAlias: 'Test1',
      },
    };
    defineAsyncPackages(config);

    expect(window.reactAsyncPackagesConfig).toEqual({
      test1: {
        url: 'test1script.com',
        nativeAlias: 'Test1',
        attributes: {},
        onLoad: null,
        onError: null,
      },
      global: {
        attributes: {},
        onLoad: null,
        onError: null,
      },
    });
  });

  it('Throws error as no config has been given', () => {
    expect(() => defineAsyncPackages({})).toThrow(
      'Package config must be supplied',
    );
  });
});
