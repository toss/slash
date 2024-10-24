/** @tossdocs-ignore */
/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function mapValues<T extends Record<PropertyKey, any>, U>(
  value: T,
  mapper: (value: T[Exclude<keyof T, symbol>]) => U
): { [K in Exclude<keyof T, symbol>]: U } {
  const entries = Object.entries(value);

  return Object.fromEntries(
    entries.map(([k, v]) => {
      return [k, mapper(v)];
    })
  ) as any;
}
