import { QS } from '@toss/utils';
import { useMemo } from 'react';

/**
 * @name useQueryParams
 */
export function useQueryParams<T extends { [key: string]: string } = { [key: string]: string }>(): Partial<T> {
  return useMemo(() => {
    return QS.parse<T>();
  }, []);
}

/**
 * @name useQueryParam
 * @example
 * const value = useQueryParam<'a' | 'b' | 'c'>('type');
 *
 * // URL이 https://toss.im/page?type=c 인 경우 -> 'c'
 * // URL이 https://toss.im/page        인 경우 -> undefined
 *
 * @example
 * const valueWithDefault = useQueryParam<'a' | 'b'>('type') ?? 'a';
 *
 * @example
 * const parsedValue = useQueryParam<number>('type', Number) ?? 0;
 */
export function useQueryParam<T extends string = string>(name: string): T | undefined;
export function useQueryParam<T>(name: string, parser: (val: string) => T): T | undefined;
export function useQueryParam<T = string>(name: string, parser?: (val: string) => T) {
  return useMemo(() => {
    return parser == null ? QS.get(name) : QS.get<T>(name, parser);
  }, [name, parser]);
}
