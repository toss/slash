/**
 * @name difference
 * @description
 * 첫 번째 배열에서 두 번째 배열에 포함되지 않은 값들을 반환합니다.
 * ```typescript
 * difference<T>(
 *   // 첫 번째 배열
 *   xs: T[],
 *   // 두 번째 배열
 *   ys: T[]
 * ): T[]
 * ```
 * @example
 * difference([1, 2, 3], [1, 2]) // [3]
 */
export function difference<T>(xs: T[], ys: T[]) {
  return differenceWith(xs, ys, (x, y) => x === y);
}

/**
 * @name differenceWith
 * @description
 * 첫 번째 배열에서 두 번째 배열에 포함되지 않은 값들을 반환합니다.
 *
 * `areItemsEqual` 함수로 두 값이 같은지 여부를 정합니다.
 *
 * ```typescript
 * differenceWith<T>(
 *   // 첫 번째 배열
 *   xs: T[],
 *   // 두 번째 배열
 *   ys: T[],
 *   // 두 값이 같은지 여부를 정하는 함수
 *   areItemsEqual: (x: T, y: T) => boolean
 * ): T[]
 * ```
 *
 * @example
 * const xs = [
 *   { x: 1, y: 2 },
 *   { x: 2, y: 1 },
 * ];
 *
 * const ys = [{ x: 1, y: 2 }];
 *
 * differenceWith(xs, ys, (a, b) => a.x === b.x && a.y === b.y) // [{ x: 2, y: 1 }]
 */
export function differenceWith<T>(xs: T[], ys: T[], areItemsEqual: (x: T, y: T) => boolean) {
  return xs.filter(x => !ys.some(y => areItemsEqual(x, y)));
}
