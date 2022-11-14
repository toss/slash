import {ObjectKeys, objectKeys} from "./object-keys";

type ArrayUnion<Type extends readonly unknown[]> = Type[number];

export function omit<ObjectType extends Record<PropertyKey, unknown>, KeyTypes extends Array<ObjectKeys<ObjectType>>>(
    obj: ObjectType,
    keys: KeyTypes,
) {
    return objectKeys(obj)
        .filter((k): k is Exclude<ObjectKeys<ObjectType>, ArrayUnion<KeyTypes>> => !keys.includes(k))
        .reduce((acc, key) => ((acc[key] = obj[key]), acc), {} as Omit<ObjectType, ArrayUnion<KeyTypes>>);
}

