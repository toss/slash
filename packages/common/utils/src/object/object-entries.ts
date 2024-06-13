/** @tossdocs-ignore */
import { ObjectKeys } from './object-keys.js';

export function objectEntries<Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> {
  return Object.entries(obj) as Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;
}
