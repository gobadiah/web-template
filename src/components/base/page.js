import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.PureComponent {
  getChildContext() {
    const { i18n, t, user } = this.props;
    return {
      i18n,
      t,
      user,
    };
  }
}

Page.propTypes = {
  i18n: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape(),
};

Page.childContextTypes = {
  i18n: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape(),
};

Page.defaultProps = {
  user: undefined,
};

export default Page;
