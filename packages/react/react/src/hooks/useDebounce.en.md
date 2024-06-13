# useDebounce

This hook makes it easy to use `lodash/debounce`.

## Example

```ts
// This function will debounce at 500ms.
const handleClick = useDebounce(() => {
  getV2Logger().log(schemaId, parameter);
}, 500);
```
