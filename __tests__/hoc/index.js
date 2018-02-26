import hoc from '~/hoc';

class Page {
}

describe('Hoc', () => {
  it('should add a getInitialProps method to Page', () => {
    expect(Page.getInitialProps).toBeUndefined();
    const result = hoc()(Page);
    expect(result.getInitialProps()).toBeInstanceOf(Promise);
  });
});
