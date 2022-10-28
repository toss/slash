# isNotNil

Evaluates whether the given value is not `null` or `undefined`;

```typescript
function isNotNil<T>(value: T | null | undefined): value is T;
```

## Example

```typescript
isNotNil(null); // false
isNotNil(undefined); // false
isNotNil(1); // true
```
