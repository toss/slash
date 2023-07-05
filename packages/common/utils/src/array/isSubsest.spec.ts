import { isSubset } from '.';

describe('isSubset', () => {
  it('should return true if the first array is empty', () => {
    // Given
    const value1 = [] as unknown[];
    const value2 = [1, 2, 3];

    // When
    const result = isSubset(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('should return true if the first array is a subset of the second array', () => {
    // Given
    const value1 = [1, 2];
    const value2 = [1, 2, 3];

    // When
    const result = isSubset(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('should return false if the first array is not a subset of the second array', () => {
    // Given
    const value1 = [1, 2, 4];
    const value2 = [1, 2, 3];

    // When
    const result = isSubset(value1, value2);

    // Then
    expect(result).toBe(false);
  });
});
