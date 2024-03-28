---
title: useSuspendedInfiniteQuery
---

# useSuspendedInfiniteQuery

기본적으로 suspense를 default로 이용하는 useInfiniteQuery입니다.

기본적인 API는 [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/) 와 동일합니다.

react-query useInfiniteQuery의 반환값과 대부분 동일하나 data가 non-nullable입니다. 추가적으로 error, isLoading, isError, isFetching이 존재하지 않습니다.

그러나 useSuspendedInfiniteQuery의 enabled(기본 값은 true)가 false일 경우 data에 undefined가 올 수 있습니다.

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
