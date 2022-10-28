# isNotNil

주어진 값이 null이나 undefined가 아닌지 확인합니다.

```typescript
function isNotNil<T>(value: T | null | undefined): value is T;
```

## Example

```typescript
isNotNil(null); // false
isNotNil(undefined); // false
isNotNil(1); // true
```
