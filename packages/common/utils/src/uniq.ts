/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
