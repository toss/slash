export function iterateEnum<EnumObjectValueType>(
  enumObject: Record<string, EnumObjectValueType>
): EnumObjectValueType[] {
  return Object.values(enumObject);
}
