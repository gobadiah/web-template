/* eslint-disable global-require */

import store, { user } from '~/redux/__fixtures__/store';

let handleUnauthorized;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('handleUnauthorized', () => {
  it('should redirect on server for status 401 when needsLogin', () => {
    ({ handleUnauthorized } = require('~/utils'));
    const res = {
      redirect: jest.fn(),
    };
    const asPath = '/some-page';
    handleUnauthorized({
      res,
      asPath,
      needsLogin: true,
      err: {
        response: {
          status: 401,
        },
      },
    });

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(302, `/signin?returnUrl=${asPath}`);
  });

  it('should redirect on client for status 401 when needsLogin', () => {
    jest.mock('../../src/routes');
    ({ handleUnauthorized } = require('~/utils'));
    const { Router } = require('~/routes');

    const asPath = '/some-page';
    handleUnauthorized({
      asPath,
      needsLogin: true,
      err: {
        response: {
          status: 401,
        },
      },
    });

    expect(Router.replace).toHaveBeenCalledTimes(1);
    expect(Router.replace).toHaveBeenCalledWith(`/signin?returnUrl=${asPath}`);
  });

  it('should do nothing for 401 error an needsLogin false', () => {
    jest.mock('../../src/routes');
    ({ handleUnauthorized } = require('~/utils'));
    const { Router } = require('~/routes');
    const res = {
      redirect: jest.fn(),
    };
    handleUnauthorized({
      err: {
        response: {
          status: 401,
        },
      },
      res,
      needsLogin: false,
    });
    expect(res.redirect).not.toHaveBeenCalled();
    expect(Router.replace).not.toHaveBeenCalled();
  });

  it('should rethrow if this is not a 401 http error', () => {
    const err = new Error('oups');
    ({ handleUnauthorized } = require('~/utils'));
    expect(() => handleUnauthorized({ err })).toThrow(err);
  });
});

describe('currentUser', () => {
  it('should returns a denormalized user if userId is defined', () => {
    const { currentUser } = require('~/utils');
    expect(currentUser(store.getState())).toEqual(user);
  });

  it('should return undefined is userId is undefined', () => {
    const { currentUser } = require('~/utils');
    const state = store.getState();
    state.auth = state.auth.set('userId', undefined);
    expect(currentUser(state)).toBeUndefined();
  });
});
