/** @tossdocs-ignore */
import { ElementType } from '@toss/utility-types';
import { ObjectKeys, objectKeys } from './object-keys';

/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function omit<ObjectType extends Record<PropertyKey, any>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
  obj: ObjectType,
  keys: KeyTypes
) {
  return objectKeys(obj)
    .filter((k): k is Exclude<ObjectKeys<ObjectType>, ElementType<KeyTypes>> => !keys.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {} as Omit<ObjectType, ElementType<KeyTypes>>);
}
