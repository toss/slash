/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function uniqBy<T>(arr: T[], hasher: (value: T) => unknown): T[] {
  const result: T[] = [];
  const addedElements = new Set<unknown>();

  for (const item of arr) {
    const hash = hasher(item);

    if (addedElements.has(hash)) {
      continue;
    }

    addedElements.add(hash);
    result.push(item);
  }

  return result;
}
