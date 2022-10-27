# isEqualOrBefore

첫 번째 Date(`lhs`)가 두 번째 Date(`rhs`)와 같거나 빠른지를 판단합니다.

```typescript
function isEqualOrBefore(
  // 계산할 첫번째 Date
  lhs: Date,
  // 계산할 두번째 Date
  rhs: Date
): boolean;
```

## Example

```typescript
isEqualOrBefore(new Date(2022, 8, 10), new Date(2022, 8, 10)); // true
isEqualOrBefore(new Date(2022, 9, 10), new Date(2022, 8, 10)); // false
isEqualOrBefore(new Date(2022, 8, 10), new Date(2022, 9, 10)); // true
```
