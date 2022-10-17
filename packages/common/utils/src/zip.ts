type ElementOf<T> = T extends Array<infer U> ? U : never;
type Zipped<T extends unknown[][]> = Array<{ [Key in keyof T]: ElementOf<T[Key]> }>;

/**
 * @name zip
 * @description
 * Array의 zip 연산을 수행합니다.
 *
 * ```typescript
 * zip<T extends unknown[][]>(
 *   // zip 연산이 수행될 배열
 *   ...arrays: [...T]
 * ): Zipped<T>
 * ```
 *
 * @example
 * zip([1, 2], ['a', 'b']) --> [[1, 'a'], [2, 'b']]
 */
export function zip<T extends unknown[][]>(...arrays: [...T]) {
  const length = Math.max(...arrays.map(x => x.length));
  const result: Zipped<T> = [];

  for (let index = 0; index < length; index++) {
    result.push(arrays.map(x => x[index]) as any);
  }

  return result;
}
