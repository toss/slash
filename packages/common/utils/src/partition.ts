/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function partition<T>(items: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const first: T[] = [];
  const second: T[] = [];

  for (const item of items) {
    if (predicate(item)) {
      first.push(item);
    } else {
      second.push(item);
    }
  }

  return [first, second];
}
