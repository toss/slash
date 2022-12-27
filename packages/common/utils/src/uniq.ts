/**
 * @name uniq
 * @description
 * 배열에서 동일한 값을 하나만 남겨서 중복을 제거합니다. 동일한지 여부는 [SameValueZero 연산](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality)로 판단합니다.
 *
 * ```typescript
 * uniq<T>(
 *   // 중복을 제거할 배열
 *   arr: T[]
 * ): T[]
 * ```
 *
 * @example
 * uniq([1, 2, 2, 3]) // [1, 2, 3]
 */
export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
