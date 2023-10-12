/** @tossdocs-ignore */
export function objectEntries<T extends Record<PropertyKey, T[keyof T]>>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj);
}
