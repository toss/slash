# sum

숫자의 합을 구합니다.

```typescript
function sum(...nums: number[] | number[][]): number;
```

## Example

```typescript
sum(1, 2, 3); // 6
sum(...[1, 2, 3]); // 6
sum([1, 2, 3]); // 6
```
