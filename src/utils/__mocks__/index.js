const utils = jest.genMockFromModule('..');

const real = require.requireActual('..');

utils.handleUnauthorized.mockImplementation(real.handleUnauthorized);
utils.currentUser.mockImplementation(real.currentUser);

module.exports = utils;
