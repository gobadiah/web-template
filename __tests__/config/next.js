import config from '../../next.config';

describe('Next config', () => {
  it('should disable fs', () => {
    const webpack = {};
    const result = config.webpack(webpack);
    expect(result).toEqual({
      node: {
        fs: 'empty',
      },
    });
  });
});
