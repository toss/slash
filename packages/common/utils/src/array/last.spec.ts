import { last } from './last';

describe('last', () => {
  it('should return last element of array.', () => {
    expect(last([1, 2, 3])).toEqual(3);
  });

  it('should return undefined when array is empty', () => {
    expect(last([])).toEqual(undefined);
  });
});
