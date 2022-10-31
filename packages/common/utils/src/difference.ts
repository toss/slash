/** @tossdocs-ignore */
export function difference<T>(xs: T[], ys: T[]) {
  return differenceWith(xs, ys, (x, y) => x === y);
}

export function differenceWith<T>(xs: T[], ys: T[], areItemsEqual: (x: T, y: T) => boolean) {
  return xs.filter(x => !ys.some(y => areItemsEqual(x, y)));
}
