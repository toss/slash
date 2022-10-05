import { ObjectKeys } from './object-keys.js';

/**
 * 타입이 깨지는 것을 방지하기 위해 사용합니다.
 * @example
 * const languages = {
 *   러스트: Rust,
 *   스위프트: Swift,
 *   자바스크립트: JavaScript,
 * } as const
 *
 * objectEntries(languages).map(([key, value]) => {
 *   // key type is '러스트' | '스위프트' | '자바스크립트'
 *   // value type is `Rust` | `Swift` | `JavaScript`
 * })
 */
export function objectEntries<Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> {
  return Object.entries(obj) as Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;
}
