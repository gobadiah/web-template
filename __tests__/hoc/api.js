/* eslint-disable global-require */

const axiosConfig = 'axiosConfig';
const readEndpoint = 'readEndpoint';
const mockSetAxiosConfig = jest.fn(() => axiosConfig);
const mockReadEndpoint = jest.fn(() => readEndpoint);
jest.mock('redux-json-api', () => ({
  reducer: jest.fn(() => ({})),
  setAxiosConfig: mockSetAxiosConfig,
  readEndpoint: mockReadEndpoint,
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('HOC api', () => {
  it('should setup the axios config used by redux-json-api', () => {
    const { setupApi } = require('~/hoc/api');

    const config = require('~/config').default;
    jest.mock('../../src/config');
    const axios = 'axios';
    config.axios.mockImplementation(() => axios);

    const req = 5;
    const store = {
      dispatch: jest.fn(),
    };
    expect(setupApi({ req, store })).toEqual({});

    expect(config.axios).toHaveBeenCalledTimes(1);
    expect(config.axios).toHaveBeenCalledWith({ req });

    expect(mockSetAxiosConfig).toHaveBeenCalledTimes(1);
    expect(mockSetAxiosConfig).toHaveBeenCalledWith(axios);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(axiosConfig);
  });

  it('should getMe when on server and if access_token cookie is present', async () => {
    const { getMe } = require('~/hoc/api');

    const res = true;
    const req = {
      cookies: {
        access_token: 'token',
      },
    };
    const store = require('~/config/redux/__fixtures__/store').default;
    const { user } = require('~/config/redux/__fixtures__/store');
    const id = 1;
    store.dispatch.mockImplementationOnce(() => Promise.resolve({
      body: {
        data: {
          id,
        },
      },
    }));

    jest.mock('../../src/config/redux/auth');

    const { signin } = require('~/config/redux/auth');

    await expect(getMe({
      store,
      res,
      req,
    })).resolves.toEqual({ user });

    expect(mockReadEndpoint).toHaveBeenCalledTimes(1);
    expect(mockReadEndpoint).toHaveBeenCalledWith('/users/me');

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(readEndpoint);

    expect(signin).toHaveBeenCalledTimes(1);
    expect(signin).toHaveBeenCalledWith(id);
  });

  it('should call handleUnauthorized if axios throws', async () => {
    const { getMe } = require('~/hoc/api');
    const { handleUnauthorized } = require('~/utils');

    jest.mock('../../src/utils');

    const res = true;
    const req = {
      cookies: {
        access_token: 'token',
      },
    };
    const asPath = '/';
    const needsLogin = true;
    const store = require('~/config/redux/__fixtures__/store').default;
    const err = new Error('yes');
    store.dispatch.mockImplementationOnce(() => Promise.reject(err));

    await expect(getMe({
      store,
      res,
      req,
      asPath,
      needsLogin,
    })).rejects.toEqual(err);

    expect(mockReadEndpoint).toHaveBeenCalledTimes(1);
    expect(mockReadEndpoint).toHaveBeenCalledWith('/users/me');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(readEndpoint);

    expect(handleUnauthorized).toHaveBeenCalledTimes(1);
    expect(handleUnauthorized).toHaveBeenCalledWith({
      err,
      res,
      asPath,
      needsLogin,
    });
  });

  it('should call currentUser if there is no access_token', () => {
    const { getMe } = require('~/hoc/api');
    const { currentUser } = require('~/utils');
    const store = require('~/config/redux/__fixtures__/store').default;
    const { user } = require('~/config/redux/__fixtures__/store');
    jest.mock('../../src/utils');

    expect(getMe({
      store,
      req: {
        cookies: {
        },
      },
    })).toEqual(user);

    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(currentUser).toHaveBeenCalledTimes(1);
    expect(currentUser).toHaveBeenCalledWith(store.getState());
  });
});
