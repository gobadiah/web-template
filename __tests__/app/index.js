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

  it('should response normally to non-next endpoint (e.g. /api)', () =>
    request(server)
      .get('/api')
      .expect(200)
      .expect('Api endpoint'));
});
