/** @tossdocs-ignore */
export function objectKeys<T extends Record<PropertyKey, T[keyof T]>>(obj: T): Array<keyof T> {
  return Object.keys(obj);
}
