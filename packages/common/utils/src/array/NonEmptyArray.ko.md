# NonEmptyArray

비어 있지 않은 배열을 나타내는 타입입니다.

```typescript
type NonEmptyArray<T> = [T, ...T[]];
```

- 이를 이용하여 [isNonEmptyArray](https://slash.page/ko/libraries/common/utils/src/array/isnonemptyarray.i18n/) 와 같은 배열이 최소 1개 이상의 원소를 가지고 있는지 확인하는 함수를 만들 수 있습니다.

# Example

```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const items: number[] = [];

// 런타임 에러
getFirstElement([]).toString();

// 타입 에러
const fixItems: NonEmptyArray<number> = [];
```
