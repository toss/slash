---
title: useSuspendedQuery
---

# useSuspendedQuery

기본적으로 suspense를 default로 이용하는 useQuery입니다.

기본적인 API는 [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/) 와 동일합니다.

```typescript
function useSuspendedQuery(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): SuspendedUseQueryResultOnSuccess<TData> | SuspendedUseQueryResultOnIdle<undefined>;
```

react-query useQuery의 반환값과 대부분 동일하나 data가 non-nullable입니다. 추가적으로 isLoading, isError, isFetching이 존재하지 않습니다.

그러나 useSuspendedQuery의 enabled(기본 값은 true)가 false일 경우 data에 undefined가 올 수 있습니다.

## Examples

```typescript
// data: number
const { data } = useSuspendedQuery(['key'], () => 1);

// data: undefined
const { data } = useSuspendedQuery(['key'], () => 1, {
  enabled: false,
});
```
