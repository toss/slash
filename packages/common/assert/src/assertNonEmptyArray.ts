/** @tossdocs-ignore */
import { NonEmptyArray } from '@toss/utils';

/**
 * @name assertNonEmptyArray
 * @description
 * 배열이 최소 1개의 원소를 가지고 있는지 검사하는 함수입니다.
 * TypeScript의 [Type Guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) 함수로 동작합니다.
 *
 * 배열이 비어 있지 않을 경우, `NonEmptyArray` 타입으로 추론됩니다. `@toss/utils` 의 `NonEmptyArray` 타입을 참고하세요.
 *
 * - TypeScript의 [noUncheckedIndexAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) 옵션을 사용하는 경우, 반환값이 있음을 타입으로 보장하기 위해서 '빈 배열이 아님' 을 체크할 필요성이 있습니다.
 *
 * ```typescript
 * function assertNonEmptyArray<T>(
 *   // 최소 1개의 원소를 가지고 있는지 검사할 배열
 *   arr: T[],
 *   // 배열이 비어 있을 때 throw할 에러
 *   // @default new Error('AssertionError: EmptyArray')
 *   error: Error | string
 * ): asserts arr is NonEmptyArray<T>;
 * ```
 * @example
 * // new Error('AssertionError: EmptyArray') 를 throw 합니다.
 * assertNonEmptyArray([]);
 *
 * // new Error('뭔가 잘못되었어요') 를 throw 합니다.
 * assertNonEmptyArray([], new Error('뭔가 잘못되었어요'));
 *
 * // 에러를 throw 하지 않습니다.
 * assertNonEmptyArray(['hi']);
 */
export function assertNonEmptyArray<T>(
  arr: T[],
  error: Error | string = new Error('AssertionError: EmptyArray')
): asserts arr is NonEmptyArray<T> {
  if (arr.length < 1) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw error;
    }
  }
}
