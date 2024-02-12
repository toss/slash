# isNil

주어진 값이 null이나 undefined인지 확인합니다.

```typescript
function isNil<T>(value: T | null | undefined): value is null | undefined;
```

## Example

```typescript
isNil(null); // true
isNil(undefined); // true
isNil(1); // false
```
