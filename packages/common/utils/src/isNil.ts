/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function isNil<T>(val: T | undefined | null): val is null | undefined {
  return val == null;
}
