/** @tossdocs-ignore */

/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function chunk<T>(arr: T[], size: number) {
  if (size < 1) {
    return [];
  }

  return arr.reduce((result, item, index) => {
    if (index % size > 0) {
      result[result.length - 1]!.push(item);
    } else {
      result.push([item]);
    }
    return result;
  }, [] as T[][]);
}
