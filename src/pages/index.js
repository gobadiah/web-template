import React from 'react';

import { Page } from '~/components/base';
import hoc from '~/hoc';

import Language from '~/components/language';
import SomePureComponent from '~/components/some-pure-component';

class Index extends Page {
  render() {
    const { t } = this.props;
    return (
      <div>
        <div>{t('index:Hello world')}</div>
        <Language />
        <SomePureComponent />
      </div>
    );
  }
}

export default hoc()(Index);
