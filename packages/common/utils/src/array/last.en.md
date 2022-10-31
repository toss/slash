# last

Returns the last element of an array. Used to declaratively write code, rather than writing `arr[arr.length - 1]`.

```typescript
function last<T>(arr: NonEmptyArray<T>): T;
function last<T>(arr: T[]): T | undefined;
```

- If an array is a normal array (`T[]`), `last` returns a nullable value, since it can be empty.
- If an array is checked not to be empty by [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n), `last` returns a non-nullable value.

## Example

```typescript
import { isNonEmptyArray } from '@toss/utils';

const array = [1, 2, 3];
last(array); // number | undefined

if (isNonEmptyArray(array)) {
  last(array); // number
}
```
