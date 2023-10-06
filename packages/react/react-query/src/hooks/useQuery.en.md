---
title: useQuery
---

# useQuery

It works the same as `useQuery` in react-query, but if the return value of `queryFn` is `undefined`, it will cause a type error.

## Examples

```typescript
// If you return undefined, an error occurs.
useQuery(['key'], () => undefined);
useQuery(['key'], async () => undefined);

// You can return null or other values.
useQuery(['key'], () => null);
useQuery(['key'], async () => null);
useQuery(['key'], () => ({ foo: 'bar' }));
useQuery(['key'], async () => ({ foo: 'bar' }));
```
