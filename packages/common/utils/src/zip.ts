type ElementOf<T> = T extends Array<infer U> ? U : never;
type Zipped<T extends unknown[][]> = Array<{ [Key in keyof T]: ElementOf<T[Key]> }>;

/** @tossdocs-ignore */
export function zip<T extends unknown[][]>(...arrays: [...T]) {
  const length = Math.max(...arrays.map(x => x.length));
  const result: Zipped<T> = [];

  for (let index = 0; index < length; index++) {
    result.push(arrays.map(x => x[index]) as any);
  }

  return result;
}
