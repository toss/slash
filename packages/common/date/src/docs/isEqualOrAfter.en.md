# isEqualOrAfter

<<<<<<< HEAD
Check if the first date (`lhs`) is equal or after the second date (`rhs`).
=======
Evaluates whether `lhs` is later than or equal to `rhs`.
>>>>>>> 0d91b2a (fix en docs)

```typescript
function isEqualOrAfter(
  // First date
  lhs: Date,
  // Second date
  rhs: Date
): boolean;
```

## Example

```typescript
isEqualOrAfter(new Date(2022, 8, 10), new Date(2022, 8, 10)); // true
isEqualOrAfter(new Date(2022, 9, 10), new Date(2022, 8, 10)); // true
isEqualOrAfter(new Date(2022, 8, 10), new Date(2022, 9, 10)); // false
```
