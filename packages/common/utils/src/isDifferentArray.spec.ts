import { isDifferentArray } from '.';

describe('isDifferentArray', () => {
  it('should return true if the two values are different in length.', () => {
    // Given
    const value1 = [1];
    const value2 = [2, 3];

    // When
    const result = isDifferentArray(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('should return true if the two arrays have the same length but one primitive value is different.', () => {
    // Given
    const value1 = [1, 3];
    const value2 = [1, 2];

    // When
    const result = isDifferentArray(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('should return true if two arrays have the same length but have different field', () => {
    // Given
    const value1 = [{ test: 1 }, { test: 2 }];
    const value2 = [{ test: 1 }, { test: 3 }];

    // When
    const result = isDifferentArray(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('should return false when two array is same', () => {
    // Given
    const value1 = [1, 2];
    const value2 = [1, 2];
    // When
    const result = isDifferentArray(value1, value2);
    // Then
    expect(result).toBe(false);
  });
});
