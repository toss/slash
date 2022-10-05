import { ObjectKeys } from './object-keys';

/**
 * 타입이 깨지는 것을 방지하기 위해 사용합니다.
 * @example
 * const languages = {
 *   러스트: Rust,
 *   스위프트: Swift,
 *   자바스크립트: JavaScript,
 * } as const
 *
 * objectValues(languages).map(value => {
 *   // value type is `Rust` | `Swift` | `JavaScript`
 * })
 */
export function objectValues<Type extends Record<PropertyKey, unknown>>(obj: Type): Array<Type[ObjectKeys<Type>]> {
  return Object.values(obj) as Array<Type[ObjectKeys<Type>]>;
}
