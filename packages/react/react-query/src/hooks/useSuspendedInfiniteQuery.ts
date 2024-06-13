/** @tossdocs-ignore */
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import { parseQueryArgs } from '../utils';

export interface BaseSuspendedUseInfiniteQueryResult<TData = unknown>
  extends Omit<UseInfiniteQueryResult<TData>, 'error' | 'isLoading' | 'isError' | 'isFetching' | 'status'> {
  status: 'success' | 'idle';
}

export type SuspendedUseInfiniteQueryResultOnSuccess<TData> = BaseSuspendedUseInfiniteQueryResult<TData> & {
  data: InfiniteData<TData>;
  status: 'success';
  isSuccess: true;
  isIdle: false;
};
export type SuspendedUseInfiniteQueryResultOnIdle = BaseSuspendedUseInfiniteQueryResult & {
  data: undefined;
  status: 'idle';
  isSuccess: false;
  isIdle: true;
};

export type SuspendedUseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>, 'suspense'>;

// arg1: queryKey, arg2: queryFn, arg3: options
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'enabled' | 'queryKey' | 'queryFn'
  >
): SuspendedUseInfiniteQueryResultOnSuccess<TData>;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'enabled' | 'queryKey' | 'queryFn'
  > & {
    enabled?: true;
  }
): SuspendedUseInfiniteQueryResultOnSuccess<TData>;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'enabled' | 'queryKey' | 'queryFn'
  > & {
    enabled: false;
  }
): SuspendedUseInfiniteQueryResultOnIdle;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): SuspendedUseInfiniteQueryResultOnSuccess<TData> | SuspendedUseInfiniteQueryResultOnIdle;

// arg1: queryKey, arg2: options
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options?: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'enabled' | 'queryKey'
  >
): SuspendedUseInfiniteQueryResultOnSuccess<TData>;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'enabled' | 'queryKey'
  > & {
    enabled?: true;
  }
): SuspendedUseInfiniteQueryResultOnSuccess<TData>;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'enabled' | 'queryKey'
  > & {
    enabled: false;
  }
): SuspendedUseInfiniteQueryResultOnIdle;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options: Omit<SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey'>
): SuspendedUseInfiniteQueryResultOnSuccess<TData> | SuspendedUseInfiniteQueryResultOnIdle;

// arg1: options
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'enabled'>
): SuspendedUseInfiniteQueryResultOnSuccess<TData>;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'enabled'> & {
    enabled?: true;
  }
): SuspendedUseInfiniteQueryResultOnSuccess<TData>;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'enabled'> & {
    enabled: false;
  }
): SuspendedUseInfiniteQueryResultOnIdle;
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>
): SuspendedUseInfiniteQueryResultOnSuccess<TData> | SuspendedUseInfiniteQueryResultOnIdle;

// base useSuspendedInfiniteQuery
export function useSuspendedInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: TQueryKey | SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
  arg2?:
    | QueryFunction<TQueryFnData, TQueryKey>
    | Omit<SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey'>,
  arg3?: Omit<
    SuspendedUseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) {
  return useInfiniteQuery({
    ...parseQueryArgs(arg1, arg2, arg3),
    suspense: true,
  }) as BaseSuspendedUseInfiniteQueryResult<TData>;
}
