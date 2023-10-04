---
title: useQuery
---

# useQuery

react-query의 `useQuery`와 동일하게 동작하지만, `queryFn`의 반환값이 `undefined`일 경우 타입 에러를 발생시킵니다.

## Examples

```typescript
// undefined를 반환하는 경우에는 에러가 발생합니다.
useQuery(['key'], () => undefined);
useQuery(['key'], async () => undefined);

// null이나 다른 값을 반환할 수 있습니다.
useQuery(['key'], () => null);
useQuery(['key'], async () => null);
useQuery(['key'], () => ({ foo: 'bar' }));
useQuery(['key'], async () => ({ foo: 'bar' }));
```
