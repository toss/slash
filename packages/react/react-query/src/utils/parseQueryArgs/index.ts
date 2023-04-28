import { QueryFunction, QueryKey, QueryOptions } from 'react-query';
import { isQueryKey } from '../';

export function parseQueryArgs<
  TOptions extends QueryOptions<any, any, any, TQueryKey>,
  TQueryKey extends QueryKey = QueryKey
>(arg1: TQueryKey | TOptions, arg2?: QueryFunction<any, TQueryKey> | TOptions, arg3?: TOptions): TOptions {
  if (!isQueryKey(arg1)) {
    return arg1 as TOptions;
  }

  if (typeof arg2 === 'function') {
    return { ...arg3, queryKey: arg1, queryFn: arg2 } as TOptions;
  }

  return { ...arg2, queryKey: arg1 } as TOptions;
}
