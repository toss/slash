# flattenArray

이차원 배열을 일차원 배열로 반환합니다.

## Example

```typescript
// [1, 2, 3, 4]
flattenArray([
  [1, 2],
  [3, 4],
]);

// [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]
flattenArray([
  [{ a: 1 }, { b: 2 }],
  [{ c: 3 }, { d: 4 }],
]);

// 일차원 배열을 입력했을 경우 입력받은 배열을 다시 그대로 반환합니다.
// 1, 2, 3, 4
flattenArray([1, 2, 3, 4]);
```
