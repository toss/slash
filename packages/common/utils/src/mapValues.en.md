# mapValues

Creates new object populated with the results of calling `mapper` on every values of the given object.

```typescript
function mapValues<T extends Record<PropertyKey, any>, U>(
  value: T,
  mapper: (value: T[Exclude<keyof T, symbol>) => U
): { [K in Exclude<keyof T, symbol>]: U };
```

## Example

```typescript
mapValues({ foo: 1, bar: 2 }, x => x * 2); // { foo: 2, bar: 4 }
```
