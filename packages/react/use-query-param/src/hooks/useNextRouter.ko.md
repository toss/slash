---
title: useNextRouter
---

# useNextRouter

`{ suspense: true }` 옵션을 사용하는 경우, `router.isReady`가 `true`가 될 때까지 Suspense를 발생시키는 Hook입니다.

반환하는 값은 Next.js의 `useRouter()` Hook과 동일합니다.

## Examples

```typescript
const router = useNextRouter({ suspense: true });

// 항상 `true`를 반환합니다.
router.isReady;
```

## References

https://nextjs.org/docs/api-reference/next/router - router.isReady
