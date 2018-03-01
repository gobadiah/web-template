import config from '~/config/jest';

describe('Jest config', () => {
  it('should match this', () => {
    expect(config).toMatchSnapshot();
  });
});
