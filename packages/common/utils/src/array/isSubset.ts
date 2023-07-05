/** @tossdocs-ignore */

export function isSubset(a: unknown[] = [], b: unknown[] = []): boolean {
  return a.every(element => b.includes(element));
}
