---
title: useQueryParam
---

# useQueryParam

Gets the value of the query parameter given as an argument.

Fetches the value of the query parameter safely from the static exported Next.js service into Suspense.
The `useQueryParam` Hook eliminates the hassle of checking the `router.isReady` value each time.

## Examples

```typescript
const value = useQueryParam<'a' | 'b' | 'c'>('type');

// If the URL is https://toss.im/page?type=c -> 'c'
// If the URL is https://toss.im/page        -> undefined

const valueWithDefault = useQueryParam<'a' | 'b'>('type') ?? 'a';

const parsedValue = useQueryParam('type', Number) ?? 0;

const valueWithRequired = useQueryParam('type', { required: true }); // string
```

## References

https://nextjs.org/docs/api-reference/next/router - router.isReady
