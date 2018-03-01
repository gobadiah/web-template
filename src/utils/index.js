import _ from 'lodash';
import denormalizer from 'json-api-denormalizer';

import { Router } from '~/routes';

export const handleUnauthorized = ({
  res,
  asPath,
  err,
  needsLogin,
}) => {
  if (_.get(err, 'response.status') !== 401) {
    throw err;
  }
  if (needsLogin) {
    if (res) {
      res.redirect(302, `/signin?returnUrl=${asPath}`);
    } else {
      Router.replace(`/signin?returnUrl=${asPath}`);
    }
  }
};

export const currentUser = state => _.get(denormalizer(state.api), `users.${state.auth.get('userId')}`);
