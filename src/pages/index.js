import React from 'react';

import hoc from '~/hoc';

const Index = (props, context) => {
  console.log('props =', props);
  console.log('context =', context);
  return (
    <div>
      {'Hello world'}
    </div>
  );
};

export default hoc()(Index);
