/** @tossdocs-ignore */
export function isDifferentArray(a: unknown[] = [], b: unknown[] = []) {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}
