/** @tossdocs-ignore */
import { ArrayElements, ObjectKeys, objectKeys } from '.';

export function split<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
  obj: ObjectType,
  keys: KeyTypes
): [Pick<ObjectType, ArrayElements<KeyTypes>>, Omit<ObjectType, ArrayElements<KeyTypes>>] {
  const keysSet = new Set(keys);
  const picked = {} as ObjectType;
  const omitted = {} as ObjectType;

  for (const key of objectKeys(obj)) {
    if (keysSet.has(key)) {
      picked[key] = obj[key];
    } else {
      omitted[key] = obj[key];
    }
  }

  return [picked, omitted];
}
