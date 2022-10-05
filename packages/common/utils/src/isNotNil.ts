/**
 * @name isNotNil
 * @description
 * 어떤 값이 null이나 undefined가 아닌지 확인합니다.
 *
 * ```typescript
 * isNotNil<T>(value: T | null | undefined): value is T
 * ```
 *
 * TypeScript의 Type Guard로 동작하기 때문에, `isNotNil`로 타입을 확인한 후에는 `null`이나 `undefined`가 아닌 것으로 추론됩니다.
 *
 * @example
 * isNotNil(null) // false
 * isNotNil(undefined) // false
 * isNotNil(1) // true
 *
 * const nullableArr: Array<number | undefined | null> = [1, 2, undefined, null];
 *
 * const notNullableArr = nullableArr.filter(isNotNil) // [1, 2], 반환 타입은 number[]
 */
export function isNotNil<T>(val: T | undefined | null): val is T {
  return val != null;
}
