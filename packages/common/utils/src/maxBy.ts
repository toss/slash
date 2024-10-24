/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function maxBy<T>(collection: T[], iteratee: (element: T) => number): T | undefined {
  if (collection.length === 0) {
    return undefined;
  }

  return collection.reduce(function (a, b) {
    return iteratee(a) >= iteratee(b) ? a : b;
  }, {} as T);
}
