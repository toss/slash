/** @tossdocs-ignore */

export function objectValues<T extends Record<PropertyKey, T[keyof T]>>(obj: T): Array<T[keyof T]> {
  return Object.values(obj);
}
