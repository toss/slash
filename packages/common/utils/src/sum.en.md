# sum

Find the sum of a number.

```typescript
function sum(...nums: number[] | number[][]): number;
```

## Example

```typescript
sum(1, 2, 3); // 6
sum(...[1, 2, 3]); // 6
sum([1, 2, 3]); // 6
```
