# groupBy

Groups an `array` by the given key from `createKey`.

```typescript
groupBy<T>(
  array: T[],
  createKey: (item: T) => string
): Record<string, T[]>
```

## Example

```typescript
const input = [
  { groupName: 'A', value: 1 },
  { groupName: 'B', value: 2 },
  { groupName: 'C', value: 3 },
  { groupName: 'C', value: 4 },
  { groupName: 'C', value: 5 },
  { groupName: 'A', value: 6 },
];

groupBy(input, ({ groupName }) => groupName);
// =>
// {
//   A: [
//     { groupName: 'A', value: 1 },
//     { groupName: 'A', value: 6 },
//   ],
//   B: [
//     { groupName: 'B', value: 2 }
//   ],
//   C: [
//     { groupName: 'C', value: 3 },
//     { groupName: 'C', value: 4 },
//     { groupName: 'C', value: 5 },
//   ],
// }
```
