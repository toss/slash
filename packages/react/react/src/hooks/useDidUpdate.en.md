# useDidUpdate

Execute effect when the values that went into deps have been updated.

- The effect is not executed on initial mount.
- This is similar to the componentDidUpdate() method.

## Example

```ts
useDidUpdate(() => {
  // Execute when value 'changes'
}, [value]);
```
