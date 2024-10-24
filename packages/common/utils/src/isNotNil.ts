/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function isNotNil<T>(val: T | undefined | null): val is T {
  return val != null;
}
