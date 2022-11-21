/** @tossdocs-ignore */
import { ObjectKeys, objectKeys } from '.';
import { ArrayElements } from './types';


export function omit<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
  obj: ObjectType,
  keys: KeyTypes
) {
  return objectKeys(obj)
    .filter((k): k is Exclude<ObjectKeys<ObjectType>, ArrayElements<KeyTypes>> => !keys.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {} as Omit<ObjectType, ArrayElements<KeyTypes>>);
}
