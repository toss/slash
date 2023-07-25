import { QueryFunction, QueryKey, useQuery as useQuery_Original, UseQueryOptions, UseQueryResult } from 'react-query';

export type InvalidQueryResult = undefined | void;
export type InvalidQueryResultWarning = 'queryFn은 undefined를 반환할 수 없습니다.';

/**
 * @name useQuery
 *
 * @description
 * react-query의 `useQuery`와 동일하게 동작하지만, `queryFn`의 반환값이 `undefined`일 경우 타입 에러를 발생시킵니다.
 *
 * @example
 * // undefined를 반환하는 경우에는 에러가 발생합니다.
 * useQuery(['key'], () => undefined);
 * useQuery(['key'], async () => undefined);
 *
 * // null이나 다른 값을 반환할 수 있습니다.
 * useQuery(['key'], () => null);
 * useQuery(['key'], async () => null);
 * useQuery(['key'], () => ({ foo: 'bar' }));
 * useQuery(['key'], async () => ({ foo: 'bar' }));
 */
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
