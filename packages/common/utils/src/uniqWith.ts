/**
 * @name uniqWith
 * @description
 * 배열에서 중복을 제거하여, 동일한 값을 하나만 남깁니다. 동일 여부를 판단하는 함수를 넘길 수 있습니다.
 *
 * ```typescript
 * uniqWith<T>(
 *   // 중복을 제거할 배열
 *   arr: T[],
 *   // 두 요소가 동일한지 판단할 함수
 *   comparator: (x: T, y: T) => boolean
 * ): T[]
 * ```
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * uniqWith(objects, isEqual);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
export function uniqWith<T>(arr: T[], comparator: (x: T, y: T) => boolean) {
  const result: T[] = [];

  for (const item of arr) {
    if (result.some(x => comparator(x, item))) {
      continue;
    }

    result.push(item);
  }

  return result;
}
