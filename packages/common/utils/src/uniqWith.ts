/** @tossdocs-ignore */
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
