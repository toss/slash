/**
 * @name reverseKeyValue
 * @description
 * key와 value를 바꿔 { [value]: key } 형태의 object를 반환합니다
 *
 * ```typescript
 * function reverseKeyValue<KeyType extends string, ValueType extends string>(
 *   obj: Record<KeyType, ValueType>,
 * ): Record<ValueType, KeyType>
 * ```
 *
 * @example
 * reverseKeyValue({ jbee: 'eebj' })
 * // => { eebj: 'jbee' }
 */
export function reverseKeyValue<KeyType extends string, ValueType extends string>(obj: Record<KeyType, ValueType>) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key])) as Record<ValueType, KeyType>;
}
