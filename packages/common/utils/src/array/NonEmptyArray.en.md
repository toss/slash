# NonEmptyArray

A type which indicates that an array is not empty.

```typescript
type NonEmptyArray<T> = [T, ...T[]];
```

- You can use this to create a function like [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n/) that checks if an array has at least one element.

# Example

```typescript
// There is no problem at the time of declaration, but runtime errors may occur depending on the internal logic.
const getSum = (array: number[]) => array.reduce((x, y) => x + y);

// [ERR]: Reduce of empty array with no initial value
getSum([]);

// Runtime errors can be prevented through type errors at the time of declaration.
const getSum = (array: NonEmptyArray<number>) => array.reduce((x, y) => x + y);

// Argument of type '[]' is not assignable to parameter of type 'NonEmptyArray<number>'. Source has 0 element(s) but target requires
getSum([]);
```
