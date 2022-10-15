import { ObjectKeys } from './index';

/**
 * @name mapValues
 * @description
 * 오브젝트의 값을 map 하는 함수입니다.
 *
 * ```typescript
 * function mapValues<T, U>(value: T, mapper: (value: T[keyof T]) => U): { [K in keyof T]: U; }
 * ```
 *
 * @example
 * mapValues({ foo: 1, bar: 2 }, x => x * 2)
 * // => { foo: 2, bar: 4 }
 */
export function mapValues<T extends Record<PropertyKey, T[ObjectKeys<T>]>, U>(
  value: T,
  mapper: (value: T[keyof T]) => U
): { [K in keyof T]: U } {
  const entries = Object.entries(value) as Array<[ObjectKeys<T>, T[ObjectKeys<T>]]>;

  return Object.fromEntries(
    entries.map(([k, v]) => {
      return [k, mapper(v)];
    })
  ) as any;
}
