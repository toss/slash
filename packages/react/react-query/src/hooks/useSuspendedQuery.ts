import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export interface BaseSuspendedUseQueryResult<TData>
  extends Omit<UseQueryResult<TData, never>, 'data' | 'status' | 'error' | 'isLoading' | 'isError' | 'isFetching'> {
  data: TData;
  status: 'success' | 'idle';
}

export type SuspendedUseQueryResultOnSuccess<TData> = BaseSuspendedUseQueryResult<TData> & {
  status: 'success';
  isSuccess: true;
  isIdle: false;
};
export type SuspendedUseQueryResultOnIdle<TData> = BaseSuspendedUseQueryResult<TData> & {
  status: 'idle';
  isSuccess: false;
  isIdle: true;
};

export type SuspendedUseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'suspense'>;

/**
 * @name useSuspendedQuery
 *
 * @description
 * 기본적으로 suspense를 default로 이용하는 useQuery입니다.
 *
 * 기본적인 API는 [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/) 와 동일합니다.
 *
 * - 반환하는 `data` 값이 nullable이 아니고, 항상 존재합니다. (Suspense를 사용하기 때문)
 *
 *
 * ```typescript
 * function useSuspendedQuery(
 *   queryKey: TQueryKey,
 *   queryFn: QueryFunction<TQueryFnData, TQueryKey>,
 *   options?: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
 * )
 * ```
 *
 * @returns `SuspendedUseQueryResultOnSuccess<TData> | SuspendedUseQueryResultOnIdle<undefined>`
 *
 * react-query useQuery의 반환값과 대부분 동일하나 data가 non-nullable입니다. 추가적으로 isLoading, isError, isFetching이 존재하지 않습니다.
 * 그러나 useSuspendedQuery의 enabled(기본 값은 true)가 boolean인 경우 data에 undefined가 올 수 있습니다.
 *
 * @example
 * const { data } = useSuspendedQuery(['key'], fetchSomething);
 *
 * // data는 undefined가 아님
 *
 * const { data } = useSuspendedQuery(['key'], fetchSomething, {
 *   enabled: boolean
 * });
 *
 * // data는 TData | undefined임
 *
 * @see https://www.youtube.com/watch?v=FvRtoViujGg 프론트엔드 웹 서비스에서 우아하게 비동기 처리하기
 */
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'>
): SuspendedUseQueryResultOnSuccess<TData>;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled?: true;
  }
): SuspendedUseQueryResultOnSuccess<TData>;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled: false;
  }
): SuspendedUseQueryResultOnIdle<undefined>;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): SuspendedUseQueryResultOnSuccess<TData> | SuspendedUseQueryResultOnIdle<undefined>;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery(queryKey, queryFn, { ...options, suspense: true }) as BaseSuspendedUseQueryResult<TData>;
}
