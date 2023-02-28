# NonEmptyArray

A type which indicates that an array is not empty.

```typescript
type NonEmptyArray<T> = [T, ...T[]];
```

- You can use this to create a function like [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n/) that checks if an array has at least one element.

# Example

```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const items: number[] = [];

// Runtime error
getFirstElement([]).toString();

// Type error
const fixItems: NonEmptyArray<number> = [];
```
