import createApp from '~/app';
import config from '~/config';

const app = createApp(config.dev);

app.then((server) => {
  server.listen(config.port, () => {
    console.log(`Listening to ${config.port}`);
  });
});
