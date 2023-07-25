/** @tossdocs-ignore */
import { QueryFunction, QueryKey, useQuery as useQuery_Original, UseQueryOptions, UseQueryResult } from 'react-query';

export type InvalidQueryResult = undefined | void;
export type InvalidQueryResultWarning = 'queryFn cannot return undefined.';

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): TQueryFnData extends InvalidQueryResult ? InvalidQueryResultWarning : UseQueryResult<TData, TError>;
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>
): TQueryFnData extends InvalidQueryResult ? InvalidQueryResultWarning : UseQueryResult<TData, TError>;
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): TQueryFnData extends InvalidQueryResult ? InvalidQueryResultWarning : UseQueryResult<TData, TError>;
export function useQuery<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  arg1: TQueryKey | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg2?: QueryFunction<TQueryFnData, TQueryKey> | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  arg3?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): TQueryFnData extends InvalidQueryResult ? InvalidQueryResultWarning : UseQueryResult<TData, TError> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useQuery_Original(arg1, arg2, arg3);
}
