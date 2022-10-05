import { NonEmptyArray } from './NonEmptyArray';

/**
 * @name last
 * @description
 * 배열의 마지막 원소를 반환합니다. `arr[arr.length - 1]` 보다 선언적으로 작성할 수 있습니다.
 *
 * - 배열이 일반 배열 (`T[]`)일 경우, 비어 있을 수 있기 때문에 nullable 값을 반환합니다.
 * - 배열이 `isNonEmptyArray`, `assertNonEmptyArray` 등으로 비어 있지 않음이 검증되었다면 (`NonEmptyArray<T>`), non-nullable 값을 반환합니다.
 *
 * ```typescript
 * last(
 *   // 마지막 원소를 찾을 배열
 *   arr: T[]
 * ): T | undefined
 *
 * last(
 *   // 마지막 원소를 찾을 배열
 *   arr: NonEmptyArray<T>
 * ): T
 * ```
 *
 * @example
 * last([1, 2, 3]); // 3
 */
export function last<T>(arr: NonEmptyArray<T>): T;
export function last<T>(arr: T[]): T | undefined;
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
