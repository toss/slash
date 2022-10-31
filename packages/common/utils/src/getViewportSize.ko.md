# getViewportSize

현재 뷰포트의 크기를 반환합니다.

Server-side 에서는 결과가 `{ width: 0, height: 0 }` 입니다.

```typescript
function getViewportSize(): Readonly<{ width: number; height: number }>;
```
