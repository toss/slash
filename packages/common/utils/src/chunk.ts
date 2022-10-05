/** @tossdocs-ignore */

/**
 * @name chunk
 * @description
 * 배열을 주어진 단위 길이만큼 나누어 내부 배열로 넣어줍니다.
 * ```typescript
 * chunk<T>(
 *   // 나눌 배열
 *   arr: T[],
 *   // 각 내부 배열의 길이
 *   size: number
 * ): T[][]
 * ```
 * @example
 * chunk([], 3); // --> []
 * chunk([1, 2, 3], -1); // --> []
 * chunk([1, 2, 3, 4, 5, 6], 3); // --> [[1, 2, 3], [4, 5, 6]]
 * chunk([1, 2, 3, 4, 5, 6, 7], 2); // --> [[1, 2], [3, 4], [5, 6], [7]]
 */
export function chunk<T>(arr: T[], size: number) {
  if (size < 1) {
    return [];
  }

  return arr.reduce((result, item, index) => {
    if (index % size > 0) {
      result[result.length - 1]!.push(item);
    } else {
      result.push([item]);
    }
    return result;
  }, [] as T[][]);
}
