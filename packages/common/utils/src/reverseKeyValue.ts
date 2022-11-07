/** @tossdocs-ignore */
export function reverseKeyValue<KeyType extends string, ValueType extends string>(obj: Record<KeyType, ValueType>) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key])) as Record<ValueType, KeyType>;
}
