import { sample } from './sample';

describe('sample', () => {
  it('should return one of the arbitrary values of the array.', () => {
    const value = [1, 2, 3];

    expect(value).toContain(sample(value));
  });

  it('should return undefined when array is empty', () => {
    expect(sample([])).toEqual(undefined);
  });
});
