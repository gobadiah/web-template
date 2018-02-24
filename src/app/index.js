import express from 'express';
import next from 'next';

export default (dev) => {
  const app = next({ dev, dir: './src' });
  const handler = app.getRequestHandler();

  return app.prepare()
    .then(() => {
      const server = express();

      server.use('*', handler);

      return server;
    });
};
