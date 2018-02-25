import hoc from '~/hoc';

describe('Hoc', () => {
  it('should add a getInitialProps method to component', () => {
    const component = {};
    expect(component.getInitialProps).toBeUndefined();
    const result = hoc()(component);
    expect(result.getInitialProps()).toEqual({});
  });
});
