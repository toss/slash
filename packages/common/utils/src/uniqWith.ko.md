# uniqWith

배열에서 중복을 제거하여, 동일한 값을 하나만 남깁니다. 동일 여부를 판단하는 함수를 넘길 수 있습니다.

```typescript
uniqWith<T>(
  // 중복을 제거할 배열
  arr: T[],
  // 두 요소가 동일한지 판단할 함수
  comparator: (x: T, y: T) => boolean
): T[]
```

## Example

```typescript
uniqWith(
  [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  isEqual
); // [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```
