type Primitive = undefined | null | boolean | number | symbol | string;

export type Serializable =
  | Primitive
  | Date // Date.toJSON() -> ISOString (serialized)
  | { toJSON: () => string }
  | readonly Serializable[]
  | Readonly<{ [key: string]: Serializable }>;
