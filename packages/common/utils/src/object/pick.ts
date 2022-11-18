/** @tossdocs-ignore */
import { ArrayElements, ObjectKeys } from '.';

export function pick<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
  obj: ObjectType,
  keys: KeyTypes
) {
  const picked = {} as Pick<ObjectType, ArrayElements<KeyTypes>>;
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
}


