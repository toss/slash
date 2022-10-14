---
title: sample
---

# sample

배열에서 임의의 원소를 고릅니다.

```typescript
function sample<T>(arr: T[]): T | undefined;
function sample<T>(arr: NonEmptyArray<T>): T;
```

- 배열이 비어 있으면 `undefined`를 반환합니다.
- 배열이 비어 있을 수 있으면 (`T[]`), `T | undefined` 를 반환합니다.
- 배열에 1개 이상의 원소가 있음이 보장되면 (`NonEmptyArray<T>`), `T` 를 반환합니다.
  - 배열이 최소 1개 이상의 원소가 있는지 체크하기 위해 `isNonEmptyArray` 타입 가드 함수 사용하세요.

## Examples

```ts
// undefined
sample([]);

// 1 또는 2 중 하나를 반환
sample([1, 2]);

// '1', '2', 또는 '3' 중 하나를 반환
sample(['1', '2', '3']);
```
