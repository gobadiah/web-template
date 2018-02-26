/* eslint-disable global-require */

beforeEach(() => { jest.resetModules(); });

describe('Sentry', () => {
  it('should render nothing if no publicDSN available', () => {
    jest.mock('../../src/config/index', () => ({
      sentry: { publicDSN: undefined },
    }));
    const Sentry = require('~/tags/sentry').default;
    expect(Sentry()).toEqual(null);
  });

  it('should render something if publicDSN is defined', () => {
    jest.mock('../../src/config/index', () => ({
      sentry: { publicDSN: 'hello' },
    }));
    const Sentry = require('~/tags/sentry').default;
    expect(Sentry()).not.toEqual(null);
  });
});
