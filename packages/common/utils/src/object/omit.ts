/** @tossdocs-ignore */
import { objectKeys } from './object-keys';
import { ElementType } from './types';

export function omit<T extends Record<PropertyKey, T[keyof T]>, K extends Array<keyof T>>(
  obj: T,
  keys: K
): Omit<T, ElementType<K>> {
  return objectKeys(obj)
    .filter((k): k is Exclude<keyof T, ElementType<K>> => !keys.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {} as Omit<T, ElementType<K>>);
}
