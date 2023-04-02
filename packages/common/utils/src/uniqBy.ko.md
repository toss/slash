# uniqBy

배열에서 중복을 제거하여, 동일한 값을 하나만 남깁니다. `hasher` 함수의 값을 바탕으로 동일 여부를 판단합니다.

```typescript
uniqBy<T>(
  // 중복을 제거할 배열
  arr: T[],
  // 동일한지 여부를 판단할 hash를 생성하는 함수
  hasher: (x: T) => unknown
)
```

## Example

```typescript
uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], item => item.x); // [{ x: 1 }, { x: 2 }]
```
