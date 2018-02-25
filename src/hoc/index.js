import { translate } from 'react-i18next';

import i18n from '~/config/i18n';

import reducePromises from './reduce-promises';
import getI18nInitialProps from './i18n';

export default () => (page) => {
  const namespace = page.name.toLowerCase();
  const namespaces = ['common', namespace];
  // eslint-disable-next-line no-param-reassign
  page.getInitialProps = args => reducePromises({
    namespaces,
    ...args,
  })([getI18nInitialProps]);
  return translate(namespaces, { i18n, wait: process.browser })(page);
};
