# zip

Array의 zip 연산을 수행합니다.

```typescript
zip<T extends unknown[][]>(
  // zip 연산이 수행될 배열
  ...arrays: [...T]
): Zipped<T>
```

## Example

```javascript
zip([1, 2], ['a', 'b']) --> [[1, 'a'], [2, 'b']];
```
