# NonEmptyArray

비어 있지 않은 배열을 나타내는 타입입니다.

```typescript
type NonEmptyArray<T> = [T, ...T[]];
```

- 이를 이용하여 [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n/) 와 같은 배열이 최소 1개 이상의 원소를 가지고 있는지 확인하는 함수를 만들 수 있습니다.

# Example

```typescript
// 선언 당시에는 문제가 없으나 내부 로직에 따라 런타임 에러가 발생할 수 있습니다.
const getSum = (array: number[]) => array.reduce((x, y) => x + y);

// [ERR]: Reduce of empty array with no initial value
getSum([]);

// 선언 당시에 type error를 통해 runtime error를 방지할 수 있습니다.
const getSum = (array: NonEmptyArray<number>) => array.reduce((x, y) => x + y);

// Argument of type '[]' is not assignable to parameter of type 'NonEmptyArray<number>'. Source has 0 element(s) but target requires
getSum([]);
```
