/**
 * @name minBy
 * @description
 * Array에서 최솟값을 가지는 요소를 반환합니다.
 * ```typescript
 * minBy<T>(
 *   // 최솟값을 찾을 배열
 *   collection: T[],
 *   // 배열의 값을 계산하는 방법
 *   iteratee: (element: T) => number
 * // 배열이 비어 있을 경우, undefined를 반환합니다.
 * ): T | undefined;
 * ```
 * @example
 * minBy([{value: 1}, {value: 3}, {value: 2}], ({ value }) => value)
 * // --> {value: 1}
 */
export function minBy<T>(collection: T[], iteratee: (element: T) => number): T | undefined {
  if (collection.length === 0) {
    return undefined;
  }

  return collection.reduce(function (a, b) {
    return iteratee(a) <= iteratee(b) ? a : b;
  }, {} as T);
}
