---
title: useSuspendedInfiniteQuery
---

# useSuspendedInfiniteQuery

This is basically a useInfiniteQuery with suspense by default.

The basic API is the same as [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/).

It is mostly the same as the return value of react-query useInfiniteQuery, but the data is non-nullable. Additionally, error, isLoading, isError, and isFetching do not exist.

However, if useSuspendedInfiniteQuery's enabled (which defaults to true) is false, data can have undefined in it.

## Examples

```typescript
// data: number
const { data } = useSuspendedInfiniteQuery({
  queryKey: ['key'],
  queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
});

// data: number | undefined
const { data } = useSuspendedInfiniteQuery({
  queryKey: ['key'],
  queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  enabled: Math.random() > 0.5,
});

// data: undefined
const { data } = useSuspendedInfiniteQuery({
  queryKey: ['key'],
  queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  enabled: false,
});
```
