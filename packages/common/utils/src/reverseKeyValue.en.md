# reverseKeyValue

Returns an object in the form of { [value]: key } by swapping key and value

if there are duplicate values in the original object, the reverseKeyValue function will group the corresponding keys into an array and associate it with the value in the reversed object.

```typescript
function reverseKeyValue<KeyType extends string, ValueType extends string>(
  obj: Record<KeyType, ValueType>
): Record<ValueType, KeyType>;
```

## Example

```typescript
reverseKeyValue({ jbee: 'eebj' });
// => { eebj: 'jbee' }

reverseKeyValue({ ricky2: 'kim', jbee: 'eebj', jbee2: 'eebj', ricky: 'kim', denny: 'kim' });
// => { eebj: ['jbee', 'jbee2'], kim: ['ricky2', 'ricky', 'denny']}
```
