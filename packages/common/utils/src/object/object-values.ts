/** @tossdocs-ignore */
import { ObjectKeys } from './object-keys';

export function objectValues<Type extends Record<PropertyKey, unknown>>(obj: Type): Array<Type[ObjectKeys<Type>]> {
  return Object.values(obj) as Array<Type[ObjectKeys<Type>]>;
}
