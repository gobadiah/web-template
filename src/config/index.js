export default {
  dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
};
