# isDifferenceArray

Evaluates whether two given arrays are different.

```typescript
function isDifferentArray(a: unknown[], b: unknown[]): boolean;
```

# Examples

```typescript
isDifferentArray([1, 2, 3], [1, 2, 3]); // false
isDifferentArray([1, 2, 3], [1]); // true
```

```typescript
const foo = { foo: 'bar' };
const bar = { bar: 'foo' };

isDifferentArray([foo, bar], [foo, bar]); // false
isDifferentArray([foo, bar], [{ foo: 'bar' }, { bar: 'foo' }]); // true
```
