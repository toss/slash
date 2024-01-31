/** @tossdocs-ignore */
export function isNil<T>(val: T | undefined | null): val is null | undefined {
  return val == null;
}
