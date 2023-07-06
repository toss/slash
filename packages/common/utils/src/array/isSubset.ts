/** @tossdocs-ignore */

export function isSubset(subSet: unknown[], wholeSet: unknown[]): boolean {
  return subSet.every(element => wholeSet.includes(element));
}
