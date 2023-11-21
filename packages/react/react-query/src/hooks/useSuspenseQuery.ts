/** @tossdocs-ignore */
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { parseQueryArgs } from '../utils/index';

export interface BaseSuspenseUseQueryResult<TData>
  extends Omit<UseQueryResult, 'data' | 'status' | 'error' | 'isLoading' | 'isError' | 'isFetching'> {
  data: TData;
  status: 'success' | 'idle';
}

export type SuspenseUseQueryResultOnSuccess<TData> = BaseSuspenseUseQueryResult<TData> & {
  status: 'success';
  isSuccess: true;
  isIdle: false;
};
export type SuspenseUseQueryResultOnIdle = BaseSuspenseUseQueryResult<undefined> & {
  status: 'idle';
  isSuccess: false;
  isIdle: true;
};

export type SuspenseUseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'suspense' | 'networkMode'>;

// arg1: queryKey, arg2: queryFn, arg3: options
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled' | 'queryKey' | 'queryFn'>
): SuspenseUseQueryResultOnSuccess<TData>;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled' | 'queryKey' | 'queryFn'> & {
    enabled?: true;
  }
): SuspenseUseQueryResultOnSuccess<TData>;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled' | 'queryKey' | 'queryFn'> & {
    enabled: false;
  }
): SuspenseUseQueryResultOnIdle;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): SuspenseUseQueryResultOnSuccess<TData> | SuspenseUseQueryResultOnIdle;

// arg1: queryKey, arg2: options
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options?: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled' | 'queryKey'>
): SuspenseUseQueryResultOnSuccess<TData>;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled' | 'queryKey'> & {
    enabled?: true;
  }
): SuspenseUseQueryResultOnSuccess<TData>;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled' | 'queryKey'> & {
    enabled: false;
  }
): SuspenseUseQueryResultOnIdle;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>
): SuspenseUseQueryResultOnSuccess<TData> | SuspenseUseQueryResultOnIdle;

// arg1: options
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'>
): SuspenseUseQueryResultOnSuccess<TData>;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled?: true;
  }
): SuspenseUseQueryResultOnSuccess<TData>;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled: false;
  }
): SuspenseUseQueryResultOnIdle;
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): SuspenseUseQueryResultOnSuccess<TData> | SuspenseUseQueryResultOnIdle;

// base useSuspenseQuery
export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  arg1: TQueryKey | SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?:
    | QueryFunction<TQueryFnData, TQueryKey>
    | Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>,
  arg3?: Omit<SuspenseUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    ...parseQueryArgs(arg1, arg2, arg3),
    suspense: true,
    networkMode: 'always',
  }) as BaseSuspenseUseQueryResult<TData>;
}
