/** @tossdocs-ignore */
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
