# createMapByKey

```typescript
function createMapByKey<Entity, KeyName extends keyof Entity>(
  objects: Entity[],
  key: KeyName
): Map<Entity[KeyName], Entity>;
```

`Entity[]`를 `Map` 객체로 변환하는 유틸입니다. 변환된 `Map`은 `Entity[key]`를 key로, `Entity`를 value로 갖습니다.

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
