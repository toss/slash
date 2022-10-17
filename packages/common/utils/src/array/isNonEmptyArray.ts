import { NonEmptyArray } from './NonEmptyArray';

/**
 * @name isNonEmptyArray
 * @description
 * 배열이 최소 1개의 원소를 가지고 있는지 확인합니다.
 * TypeScript의 [Type Guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) 함수로 동작합니다.
 * ```typescript
 * function isNonEmptyArray<T>(
 *   // 최소 1개의 원소를 가지고 있는지 검사할 배열
 *   arr: T[]
 * ): arr is NonEmptyArray<T>;
 * ```
 * @example
 * isNonEmptyArray([]); // false
 * isNonEmptyArray(['hi']); // true
 */
export function isNonEmptyArray<T>(array: T[]): array is NonEmptyArray<T> {
  return array.length >= 1;
}
