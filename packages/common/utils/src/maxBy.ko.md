# maxBy

주어진 배열에서 최댓값을 가지는 요소를 반환합니다. `iteratee` 함수로 최댓값을 계산할 방법을 정합니다.

```typescript
maxBy<T>(
  // 최댓값을 찾을 배열
  collection: T[],
  // 배열의 값을 계산하는 방법
  iteratee: (element: T) => number
// 배열이 비어 있을 경우, undefined를 반환합니다.
): T | undefined;
```

## Example

```typescript
maxBy([{ value: 1 }, { value: 3 }, { value: 2 }], ({ value }) => value); // { value: 3 }
```
