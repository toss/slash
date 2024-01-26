/** @tossdocs-ignore */
export function isNil<T>(val: T | undefined | null): val is T {
  return val == null;
}
