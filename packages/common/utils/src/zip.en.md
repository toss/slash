# zip

Performs a zip operation on an Array.

```typescript
zip<T extends unknown[][]>(
  // The array on which the zip operation will be performed
  ...arrays: [...T]
): Zipped<T>
```

## Example

```javascript
zip([1, 2], ['a', 'b']) --> [[1, 'a'], [2, 'b']];
```
