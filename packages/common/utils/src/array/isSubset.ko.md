# isSubset

첫 번째 배열이 두 번째 배열의 부분 집합인지 여부를 검사합니다.

```typescript
function isSubset(subSet: Array<string | number>, wholeSet: Array<string | number>): boolean;
```

# Examples

```typescript
isSubset([], [1, 2, 3]); // true
isSubset([1, 2], [1, 2, 3]); // true
isSubset([3, 2, 1], [1, 2, 3]); // true
isSubset(['v', 'u'], ['v', 'a', 'l', 'u', 'e']); // true
isSubset([{ a: 1 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }]); // true
isSubset([1, 4], [1, 2, 3]); // false
```
