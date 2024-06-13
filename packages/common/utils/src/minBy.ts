/** @tossdocs-ignore */
export function minBy<T>(collection: T[], iteratee: (element: T) => number): T | undefined {
  if (collection.length === 0) {
    return undefined;
  }

  return collection.reduce(function (a, b) {
    return iteratee(a) <= iteratee(b) ? a : b;
  }, {} as T);
}
