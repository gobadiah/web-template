import express from 'express';
import next from 'next';

import config from '~/config';

const { dev } = config;

const app = next({ dev, dir: './src' });
const handler = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use('*', handler);

    server.listen(config.port, (err) => {
      if (err) {
        throw err;
      }
    });
  });
