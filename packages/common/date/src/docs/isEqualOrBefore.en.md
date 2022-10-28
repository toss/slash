# isEqualOrBefore

Check if the first date (`lhs`) is equal or before the second date (`rhs`).

```typescript
function isEqualOrBefore(
  // First date
  lhs: Date,
  // Second date
  rhs: Date
): boolean;
```

## Example

```typescript
isEqualOrBefore(new Date(2022, 8, 10), new Date(2022, 8, 10)); // true
isEqualOrBefore(new Date(2022, 9, 10), new Date(2022, 8, 10)); // false
isEqualOrBefore(new Date(2022, 8, 10), new Date(2022, 9, 10)); // true
```
