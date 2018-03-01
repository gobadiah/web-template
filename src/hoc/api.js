import _ from 'lodash';
import { setAxiosConfig, readEndpoint } from 'redux-json-api';
import denormalizer from 'json-api-denormalizer';

import config from '~/config';
import { signin } from '~/config/redux';
import { handleUnauthorized, currentUser } from '~/utils';

export const setupApi = ({ req, store }) => {
  store.dispatch(setAxiosConfig(config.axios({ req })));
  return {};
};

export const getMe = ({
  res,
  req,
  asPath,
  needsLogin,
  store,
}) => (_.get(req, 'cookies.access_token') ?
  store.dispatch(readEndpoint('/users/me'))
    .then((result) => {
      store.dispatch(signin(result.body.data.id));
      const user = denormalizer(store.getState().api)
        .users[store.getState().auth.get('userId')];
      return {
        user,
      };
    }).catch(err => handleUnauthorized({
      err,
      res,
      asPath,
      needsLogin,
    }))
  : currentUser(store.getState()));
