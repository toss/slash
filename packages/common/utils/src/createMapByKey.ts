/**
 * @name createMapByKey
 * Entity의 배열에서 key를 키로 하는 Map을 만들어 반환합니다.
 * @example
 * const entities = [{ id: 1, value: 'foo' }, { id: 2, value: 'bar' }];
 * const map = createMapByKey(entities, 'id');
 * // --> 1: { id: 1, value: 'foo' }, 2: { id: 2, value: 'bar' } 인 Map 객체
 * @param objects Entity의 배열
 * @param key 검색할 key
 */
export function createMapByKey<Entity, KeyName extends keyof Entity>(
  objects: Entity[],
  key: KeyName
): Map<Entity[KeyName], Entity> {
  type KeyType = Entity[KeyName];

  const map = new Map<KeyType, Entity>();

  for (const obj of objects) {
    const keyValue = obj[key];
    map.set(keyValue, obj);
  }

  return map;
}
