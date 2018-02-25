import React from 'react';
import PropTypes from 'prop-types';

const Language = (props, { i18n, t }) => (
  <div>
    <div><input type='button' onClick={() => i18n.changeLanguage('fr')} value={t('Switch to french')} /></div>
    <div><input type='button' onClick={() => i18n.changeLanguage('en')} value={t('Switch to english')} /></div>
  </div>
);

Language.contextTypes = {
  i18n: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape(),
};

export default Language;
