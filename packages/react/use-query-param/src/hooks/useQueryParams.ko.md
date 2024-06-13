---
title: useQueryParams
---

# useQueryParams

모든 쿼리 파라미터의 값을 객체로 가져옵니다.

Static export된 Next.js 서비스에서 안전하게 쿼리 파라미터의 값을 Suspense로 가져옵니다.
`useQueryParams` Hook은 `router.isReady` 값을 매번 체크해야 하는 번거로움을 없앱니다.

## Examples

```typescript
// URL이 https://toss.im/page?id=raon0211 인 경우 -> { id: 'raon0211' }
// URL이 https://toss.im/page             인 경우 -> undefined
const params = useQueryParams();

const id = params.id;
```
