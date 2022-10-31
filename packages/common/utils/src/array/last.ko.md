# last

배열의 마지막 원소를 반환합니다. `arr[arr.length - 1]` 보다 선언적으로 코드를 작성하기 위해 유용합니다.

```typescript
function last<T>(arr: NonEmptyArray<T>): T;
function last<T>(arr: T[]): T | undefined;
```

- 배열이 일반 배열(`T[]`)일 경우, 비어 있을 수 있기 때문에 nullable 값을 반환합니다.
- 배열이 [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n)로 비어 있지 않음이 검증되었다면, non-nullable 값을 반환합니다.

## Example

```typescript
import { isNonEmptyArray } from '@toss/utils';

const array = [1, 2, 3];
last(array); // number | undefined

if (isNonEmptyArray(array)) {
  last(array); // number
}
```
