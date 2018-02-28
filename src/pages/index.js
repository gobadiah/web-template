import React from 'react';

import Link from 'next/link';

import { Page } from '~/components/base';
import hoc from '~/hoc';

import Language from '~/components/language';
import SomePureComponent from '~/components/some-pure-component';

import s from '~/styles/pages';

class Index extends Page {
  render() {
    const { t } = this.props;
    return (
      <div css='background-color: hotpink;'>
        <div className={s.helloWorld}>{t('index:Hello world')}</div>
        <Language />
        <SomePureComponent />
        <Link href='/generate_error'><a>Generate error</a></Link>
      </div>
    );
  }
}

export default hoc('index')(Index);
