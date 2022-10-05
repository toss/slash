/**
 * @name identity
 * @description
 * 인자를 그대로 반환합니다.
 * ```typescript
 * identity<T>(value: T): T
 * ```
 */
export function identity<T>(x: T) {
  return x;
}
