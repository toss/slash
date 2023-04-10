# usePreservedReference

Tells the reference to change only if the value has changed when compared with the comparator.

By default, it will keep the reference if it is the same value when JSON.stringify is done.

```ts
// Validation function with JSON.stringify to validate equality of values
function areDeeplyEqual<T extends NotNullishValue>(x: T, y: T) {
  return JSON.stringify(x) === JSON.stringify(y);
}

function usePreservedReference<T extends NotNullishValue>(
  // The value to preserve the reference to
  value: T,
  // Functions to validate equality of values
  // default: areDeeplyEqual
  areValuesEqual: (a: T, b: T) => boolean = areDeeplyEqual
): T;
```

## Example

```ts
const params = usePreservedReference(loggerParams, areParamsEqual);
```
