# arrayIncludes

A utility function to help removing type assertions when using [Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).

## Example

```typescript
const arr: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];

const element: string = 'a';

// A type error occurs when using Array.prototype.includes,
// since string is not assignable to 'a' | 'b' | 'c'.
arr.includes(element);

// By using arrayIncludes, you can check if an element is included in the array,
// without type errors or type assertions.
arrayIncludes(arr, element);
```
