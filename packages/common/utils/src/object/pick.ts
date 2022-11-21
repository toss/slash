/** @tossdocs-ignore */
import { ObjectKeys } from '.';
import { ElementType } from './types';

export function pick<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
  obj: ObjectType,
  keys: KeyTypes
) {
  const picked = {} as Pick<ObjectType, ElementType<KeyTypes>>;
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
}
