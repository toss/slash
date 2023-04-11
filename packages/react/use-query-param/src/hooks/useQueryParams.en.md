---
title: useQueryParams
---

# useQueryParams

Get the values of all query parameters as objects.

Safely get the values of query parameters into Suspense from the static exported Next.js service.
The `useQueryParams` Hook eliminates the hassle of checking the `router.isReady` value every time.

## Examples

```typescript
// If the URL is https://toss.im/page?id=raon0211 -> { id: 'raon0211' }
// if the URL is https://toss.im/page             -> undefined
const params = useQueryParams();

const id = params.id;
```
