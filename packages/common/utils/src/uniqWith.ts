/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function uniqWith<T>(arr: T[], comparator: (x: T, y: T) => boolean) {
  const result: T[] = [];

  for (const item of arr) {
    if (result.some(x => comparator(x, item))) {
      continue;
    }

    result.push(item);
  }

  return result;
}
