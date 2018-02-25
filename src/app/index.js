import express from 'express';
import next from 'next';
import path from 'path';

import fsBackend from 'i18next-node-fs-backend';
import i18nextMiddleware, { LanguageDetector } from 'i18next-express-middleware';

import i18n, { availableLanguages } from '~/config/i18n';

export default dev => new Promise(resolve => { /* i18n.use(LanguageDetector)
  .use(fsBackend)
  .init({
    preload: availableLanguages,
    ns: ['index'],
    backend: {
      loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.missing.json'),
      jsonIndent: 2,
    },
  }, () => {
  */
  const app = next({ dev, dir: './src' });
    const handler = app.getRequestHandler();

    app.prepare()
      .then(() => {
        const server = express();

        /*
        server.use(i18nextMiddleware.handle(i18n));

        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
        server.use('/locales', express.static(path.join(__dirname, '../../locales')));
        */

        server.use('*', handler);

        resolve(server);
      });
  });
