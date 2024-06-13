/** @tossdocs-ignore */
export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
