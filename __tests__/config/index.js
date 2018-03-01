/* eslint-disable global-require */

beforeEach(() => jest.resetModules());

describe('Config', () => {
  it('should have a set of keys', () => {
    const config = require('~/config').default;
    expect(Object.keys(config)).toEqual([
      'api',
      'web',
      'port',
      'axios',
      'dev',
      'sentry',
      'google',
      'facebook',
    ]);
    expect(config.api).toEqual('http://127.0.0.1:8000');
    expect(config.web).toEqual('http://127.0.0.1:3000');
    expect(config.port).toEqual(3000);
    expect(config.dev).toEqual(true);
    expect(config.port).toEqual(3000);
    expect(Object.keys(config.sentry)).toEqual([
      'DSN',
      'publicDSN',
    ]);
    expect(Object.keys(config.google)).toEqual([
      'clientId',
      'clientSecret',
      'scope',
    ]);
    expect(config.google.scope).toEqual([
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.birthday.read',
      'https://www.googleapis.com/auth/user.emails.read',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]);
    expect(Object.keys(config.facebook)).toEqual([
      'clientId',
      'clientSecret',
    ]);
    const axios = config.axios();
    expect(axios).toEqual({
      baseUrl: 'http://127.0.0.1:8000',
      withCredentials: true,
      headers: {},
    });
  });

  it('has a api property based on API_URL', () => {
    const url = 'http://some-api';
    global.process.env.API_URL = url;
    const config = require('~/config').default;
    expect(config.api).toEqual(url);
  });

  it('has a api property when on browser uses web', () => {
    global.process.browser = true;
    const config = require('~/config').default;
    expect(config.api).toEqual(`${config.web}/api`);
  });

  it('has a web property based on WEB_URL', () => {
    const url = 'http://some-url';
    global.process.env.WEB_URL = url;
    const config = require('~/config').default;
    expect(config.web).toEqual(url);
  });

  it('has a port property based on PORT', () => {
    const port = 3456;
    global.process.env.PORT = port;
    const config = require('~/config').default;
    expect(config.port).toEqual(port);
  });

  it('has a dev property based on NODE_ENV', () => {
    const config = require('~/config').default;
    expect(config.dev).toEqual(true);
  });

  it('has a google property based on GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET', () => {
    global.process.env.GOOGLE_CLIENT_ID = 'google-client-id';
    global.process.env.GOOGLE_CLIENT_SECRET = 'google-client-secret';
    const config = require('~/config').default;
    expect(config.google.clientId).toEqual('google-client-id');
    expect(config.google.clientSecret).toEqual('google-client-secret');
  });

  it('has a facebook property based on FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET', () => {
    global.process.env.FACEBOOK_CLIENT_ID = 'facebook-client-id';
    global.process.env.FACEBOOK_CLIENT_SECRET = 'facebook-client-secret';
    const config = require('~/config').default;
    expect(config.facebook.clientId).toEqual('facebook-client-id');
    expect(config.facebook.clientSecret).toEqual('facebook-client-secret');
  });
});
