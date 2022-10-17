export type ObjectKeys<T extends Record<PropertyKey, unknown>> = Exclude<keyof T, symbol>;

/**
 * 타입이 깨지는 것을 방지하기 위해 사용합니다.
 * @example
 * const languages = {
 *   러스트: Rust,
 *   스위프트: Swift,
 *   자바스크립트: JavaScript,
 * } as const
 *
 * objectKeys(languages).map(key => {
 *   // key type is '러스트' | '스위프트' | '자바스크립트'
 * })
 */
export function objectKeys<Type extends Record<PropertyKey, unknown>>(obj: Type): Array<ObjectKeys<Type>> {
  return Object.keys(obj) as Array<ObjectKeys<Type>>;
}
