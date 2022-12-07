/** @tossdocs-ignore */
export function groupBy<T>(data: T[], createKey: (item: T) => string | number) {
  return data.reduce((result: Record<string, T[]>, current) => {
    const key = createKey(current);
    const value = result[key];
    if (value == null) {
      result[key] = [current];
    } else {
      value.push(current);
    }
    return result;
  }, {});
}
