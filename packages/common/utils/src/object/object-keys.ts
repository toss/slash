/** @tossdocs-ignore */
export type ObjectKeys<T extends Record<PropertyKey, unknown>> = Exclude<keyof T, symbol>;

export function objectKeys<Type extends Record<PropertyKey, unknown>>(obj: Type): Array<ObjectKeys<Type>> {
  return Object.keys(obj) as Array<ObjectKeys<Type>>;
}
