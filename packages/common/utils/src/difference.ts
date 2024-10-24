/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function difference<T>(xs: T[], ys: T[]) {
  return differenceWith(xs, ys, (x, y) => x === y);
}

/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function differenceWith<T>(xs: T[], ys: T[], areItemsEqual: (x: T, y: T) => boolean) {
  return xs.filter(x => !ys.some(y => areItemsEqual(x, y)));
}
