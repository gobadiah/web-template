export default {
  dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
  sentry: {
    DSN: process.env.SENTRY_DSN,
    publicDSN: process.env.SENTRY_PUBLIC_DSN,
  },
};
