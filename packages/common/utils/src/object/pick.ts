/** @tossdocs-ignore */
import { ElementType } from './types';

export function pick<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<keyof ObjectType>>(
  obj: ObjectType,
  keys: KeyTypes
) {
  const picked = {} as Pick<ObjectType, ElementType<KeyTypes>>;
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
}
