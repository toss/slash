/** @tossdocs-ignore */
export function arrayIncludes<Type>(array: Type[] | readonly Type[], item: unknown, fromIndex?: number): item is Type {
  return array.includes(item as Type, fromIndex);
}
