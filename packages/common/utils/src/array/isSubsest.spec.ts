import { isSubset } from '.';

describe('isSubset', () => {
  it('should return true if the first array is empty', () => {
    // Given
    const subset = [] as string[];
    const wholeSet = [1, 2, 3];

    // When
    const result = isSubset(subset, wholeSet);

    // Then
    expect(result).toBe(true);
  });

  it('should return true if the first array is a subset of the second array', () => {
    // Given
    const subset = [1, 2];
    const wholeSet = [1, 2, 3];

    // When
    const result = isSubset(subset, wholeSet);

    // Then
    expect(result).toBe(true);
  });

  it('should return true if the first array of objects is a subset of the second array of objects', () => {
    // Given
    const subset = [{ team: 'toss' }, { lib: 'utils' }];
    const wholeSet = [{ team: 'toss' }, { language: 'typescript' }, { lib: 'utils' }];

    // When
    const result = isSubset(subset, wholeSet);

    // Then
    expect(result).toBe(true);
  });

  it('should return false if the first array is not a subset of the second array', () => {
    // Given
    const subset = [1, 2, 4];
    const wholeSet = [1, 2, 3];

    // When
    const result = isSubset(subset, wholeSet);

    // Then
    expect(result).toBe(false);
  });
});
