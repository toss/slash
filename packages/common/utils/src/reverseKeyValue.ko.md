# reverseKeyValue

key와 value를 바꿔 { [value]: key } 형태의 object를 반환합니다

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
