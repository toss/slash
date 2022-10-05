import isDifferentArray from './isDifferentArray';

describe('isDifferentArray', () => {
  it('두 값이 길이가 다를 경우, true를 반환한다.', () => {
    // Given
    const value1 = [1];
    const value2 = [2, 3];

    // When
    const result = isDifferentArray(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('두 배열이 길이는 같지만 하나의 primitive 값이 다를 경우 true를 반환한다', () => {
    // Given
    const value1 = [1, 3];
    const value2 = [1, 2];

    // When
    const result = isDifferentArray(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('두 배열이 길이는 같지만 하나의 객체 필드값이 다를 경우, true를 반환한다.', () => {
    // Given
    const value1 = [{ test: 1 }, { test: 2 }];
    const value2 = [{ test: 1 }, { test: 3 }];

    // When
    const result = isDifferentArray(value1, value2);

    // Then
    expect(result).toBe(true);
  });

  it('두 배열이 동일할 경우, false를 반환한다.', () => {
    // Given
    const value1 = [1, 2];
    const value2 = [1, 2];
    // When
    const result = isDifferentArray(value1, value2);
    // Then
    expect(result).toBe(false);
  });
});
