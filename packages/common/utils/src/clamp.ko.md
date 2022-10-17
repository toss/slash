---
title: clamp
---

# clamp

어떤 값의 최댓값, 최솟값을 설정합니다. 그 값이 최댓값보다 크다면, 최댓값을 반환합니다. 최솟값보다 작다면, 최솟값을 반환합니다.

- 주의: `clamp` 함수에 주어진 최솟값이 최댓값보다 크면 에러를 발생시킵니다.

```typescript
function clamp(value: number, min: number): number;
function clamp(value: number, min: number, max: number): number;
```

## Examples

```typescript
clamp(3, 1); // 3
clamp(3, 1, 5); // 3
clamp(3, 5); // 5
clamp(7, 3, 5); // 5
```
