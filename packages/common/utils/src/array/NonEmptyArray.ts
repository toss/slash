/**
 * @name NonEmptyArray
 * @description
 * 비어 있지 않은 배열을 나타냅니다.
 */
export type NonEmptyArray<T> = [T, ...T[]];
