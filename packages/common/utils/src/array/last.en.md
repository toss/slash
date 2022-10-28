# last

<<<<<<< HEAD
Returns the last element of an array. Used to declaratively write code, rather than writing `arr[arr.length - 1]`.
=======
Returns the last element of `arr`. It is more declarative than `arr[arr.length - 1]`.
>>>>>>> 0d91b2a (fix en docs)

```typescript
function last<T>(arr: NonEmptyArray<T>): T;
function last<T>(arr: T[]): T | undefined;
```

<<<<<<< HEAD
- If an array is a normal array (`T[]`), `last` returns a nullable value, since it can be empty.
- If an array is checked not to be empty by [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n), `last` returns a non-nullable value.
=======
- If `arr` is `T[]`, it returns the nullable value because `arr` could be empty.
- If `arr` is [NonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n), it returns the non-nullable value.
>>>>>>> 0d91b2a (fix en docs)

## Example

```typescript
import { isNonEmptyArray } from '@toss/utils';

const array = [1, 2, 3];
last(array); // number | undefined

if (isNonEmptyArray(array)) {
  last(array); // number
}
```
