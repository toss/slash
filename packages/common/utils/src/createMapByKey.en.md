# createMapByKey

```typescript
function createMapByKey<Entity, KeyName extends keyof Entity>(
  objects: Entity[],
  key: KeyName
): Map<Entity[KeyName], Entity>;
```

Convert `Entity[]` to a `Map`. The converted map has `Entity[key]` as the key, and `Entity` as the value.

## Example

```typescript
const objects = [
  { id: 'a', value: 'foo' },
  { id: 'b', value: 'bar' },
];

const map = createMapByKey(objects, 'id'); // Map<Entity['id'], Entity>

map.get('a'); // { id: 'a', value: 'foo' }
map.get('b'); // { id: 'b', value: 'bar' }
```
