# partition

배열을 `predicate`가 반환하는 `true`/`false` 값에 따라서 2개의 배열로 분리합니다.

```typescript
const [
  // predicate가 true를 반환하는 배열 요소들 (`T[]`)
  first,
  // predicate가 false를 반환하는 배열 요소들 (`T[]`)
  second,
] = partition<T>(
  // predicate로 분리할 배열
  items: T[],
  // 요소를 first/second 중 어디에 넣을지 결정하는 함수
  predicate: (item: T) => boolean,
);
```

## Example

```typescript
partition([1, 2, 3, 4, 5], x => x < 3); // [[1, 2], [3, 4, 5]]
```
