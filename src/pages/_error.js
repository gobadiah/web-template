import React from 'react';

import config from '~/config';
import getRaven from '~/config/raven';

const Error = () => <div>An error occured</div>;

Error.getInitialProps = (args) => {
  const { req, err } = args;
  if (err && req && config.sentry.DSN) {
    const Raven = getRaven();
    Raven.captureException(err);
  }
  return {};
};

export default Error;
