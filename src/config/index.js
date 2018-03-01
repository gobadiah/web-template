import axios from './axios';

const port = parseInt(process.env.PORT, 10) || 3000;
const web = process.env.WEB_URL || `http://127.0.0.1:${port}`;
const api = process.browser ? `${web}/api` : process.env.API_URL || 'http://127.0.0.1:8000';

export default {
  api,
  web,
  port,
  axios: args => axios({ api, ...(args || {}) }),
  dev: process.env.NODE_ENV !== 'production',
  sentry: {
    DSN: process.env.SENTRY_DSN,
    publicDSN: process.env.SENTRY_PUBLIC_DSN,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/user.birthday.read',
      'https://www.googleapis.com/auth/user.emails.read',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
};
