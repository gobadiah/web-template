import reducePromises from '~/hoc/reduce-promises';

describe('reducePromises', () => {
  it('reduce values of difference promises', () => {
    const a = new Promise(resolve => resolve({ a: 1 }));
    const b = new Promise(resolve => resolve({ b: 2 }));
    const c = args => new Promise(resolve => resolve(args));
    return reducePromises({ c: 3 })([a, b, c])
      .then((result) => {
        expect(result).toEqual({
          a: 1,
          b: 2,
          c: 3,
        });
      });
  });
});
