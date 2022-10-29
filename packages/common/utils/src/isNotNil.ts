/** @tossdocs-ignore */
export function isNotNil<T>(val: T | undefined | null): val is T {
  return val != null;
}
