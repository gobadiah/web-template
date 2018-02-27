import request from 'supertest';

import createApp from '~/app';

let server;

beforeAll(() => createApp(false).then((value) => { server = value.listen(0); }));

afterAll(() => { server.close(); });

describe('App', () => {
  it('should respond with 200 status for index and contain some french text', () =>
    request(server)
      .get('/')
      .expect(200)
      .expect(/>Salut le monde !<\/div>/));
});
