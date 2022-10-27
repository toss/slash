# arrayIncludes

[Array.prototype.includes()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)을 사용할 때 type assertion을 사용해야하는 불편함을 해소해주는 유틸입니다.

## Example

```typescript
const arr: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];

const element: string = 'a';

// Array.prototype.includes 를 사용할 땐 Type Error가 발생합니다.
// string은 'a' | 'b' | 'c'에 해당하지 않기 때문입니다.
arr.includes(element);

// arrayIncludes 를 사용하면 Type Error와 type assertion 없이 포함 여부를 검사할 수 있습니다.
arrayIncludes(arr, element);
```
