# reverseKeyValue

Returns an object in the form of { [value]: key } by replacing key and value

```typescript
function reverseKeyValue<KeyType extends string, ValueType extends string>(
  obj: Record<KeyType, ValueType>
): Record<ValueType, KeyType>;
```

## Example

```typescript
reverseKeyValue({ jbee: 'eebj' });
// => { eebj: 'jbee' }
```
