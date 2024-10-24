/** @tossdocs-ignore */
export function flattenArray<Type>(array: Type[]): Type[];
export function flattenArray<Type>(array: Type[][]): Type[] {
  if (array.length === 0) {
    return array as Type[] & Type[][];
  }

  if (Array.isArray(array[0])) {
    return (array as Type[][]).reduce((acc: Type[], curr: Type[]) => acc.concat(curr), []);
  }

  return array as Type[] & Type[][];
}
