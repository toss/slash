---
title: useSuspendedQuery
---

# useSuspendedQuery

This is basically a useQuery with suspense by default.

The basic API is the same as [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/).

```typescript
function useSuspendedQuery(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): SuspendedUseQueryResultOnSuccess<TData> | SuspendedUseQueryResultOnIdle<undefined>;
```

It is mostly the same as the return value of react-query useQuery, but the data is non-nullable. Additionally, isLoading, isError, and isFetching do not exist.

However, if useSuspendedQuery's enabled (which defaults to true) is false, data can have undefined in it.

## Examples

```typescript
// data: number
const { data } = useSuspendedQuery(['key'], () => 1);

// data: undefined
const { data } = useSuspendedQuery(['key'], () => 1, {
  enabled: false,
});
```
