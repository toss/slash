/** @tossdocs-ignore */

export function reverseKeyValue<KeyType extends string, ValueType extends string>(obj: Record<KeyType, ValueType>) {
  const reversedObj: Record<ValueType, KeyType | KeyType[]> = {} as Record<ValueType, KeyType | KeyType[]>;
  for (const [key, value] of Object.entries(obj) as Array<[KeyType, ValueType]>) {
    if (value in reversedObj) {
      const existingValue = reversedObj[value];
      reversedObj[value] = Array.isArray(existingValue) ? [...existingValue, key] : [existingValue, key];
    } else {
      reversedObj[value] = key;
    }
  }
  return reversedObj;
}
