# difference

첫 번째 배열(`xs`)에서 두 번째 배열(`ys`)에 포함되지 않은 값들을 반환합니다.

```typescript
function difference<T>(
  // 첫 번째 배열
  xs: T[],
  // 두 번째 배열
  ys: T[]
): T[];
```

## Example

```typescript
difference([1, 2, 3], [1, 2]); // [3]
```
