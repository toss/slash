# shuffle

인자로 전달받은 Array를 복제하여 순서를 랜덤으로 섞고 리턴합니다.
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

```typescript
function shuffle<T>(array: T[]): T[];
```

## Example

```typescript
shuffle([1, 2, 3]); // [2, 3, 1]...
```
