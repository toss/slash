/** @tossdocs-ignore */
import { ObjectKeys, omit, pick } from '.';

export function split<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
  obj: ObjectType,
  keys: KeyTypes
): [ReturnType<typeof pick<ObjectType, KeyTypes>>, ReturnType<typeof omit<ObjectType, KeyTypes>>] {
  return [pick(obj, keys), omit(obj, keys)];
}
