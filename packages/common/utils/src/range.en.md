# range

Returns an array of numbers starting at `start` and ending just before `end` .
If `end` is omitted, numbers from 0 to just before the first argument `end` are returned.
Note that `end` is not included in the returned array.

```typescript
range(
  // start number
  start: number,
  // end number (note: `end` is not included)
  end?: number,
  // spacing of the numbers to be included in the array
  // @default 1
  step?: number
): number[];
```

## Example

see https://lodash.com/docs/4.17.15#range

```typescript
range(1, 5); // [1, 2, 3, 4]

// If end is omitted
range(4); // [0, 1, 2, 3]

// You can set the spacing of the numbers with step.
range(1, 11, 3); // [1, 4, 7, 10]
```
