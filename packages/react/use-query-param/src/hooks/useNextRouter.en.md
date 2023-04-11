---
title: useNextRouter
---

# useNextRouter

If you use the `{ suspense: true }` option, this Hook raises suspense until `router.isReady` becomes `true`.

The value it returns is the same as the `useRouter()` Hook in Next.js.

## Examples

```typescript
const router = useNextRouter({ suspense: true });

// Always returns `true`.
router.isReady;
```

## References

https://nextjs.org/docs/api-reference/next/router - router.isReady
