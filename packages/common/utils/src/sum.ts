/**
 * @name sum
 * @description
 * 숫자의 합을 구합니다.
 * ```typescript
 * function sum(...nums: number[] | number[][]): number;
 * ```
 *
 * @example
 * sum(1, 2, 3) // 6
 * sum(...[1, 2, 3]) // 6
 * sum([1, 2, 3]) // 6
 */
export function sum(...nums: number[] | number[][]) {
  return nums.flat().reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}
