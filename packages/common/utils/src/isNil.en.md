# isNil

Checks if the given value is `null` or `undefined`;

```typescript
function isNil<T>(value: T | null | undefined): value is T;
```

## Example

```typescript
isNil(null); // true
isNil(undefined); // true
isNil(1); // false
```
