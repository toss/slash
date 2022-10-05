/**
 * @name arrayIncludes
 * @description
 * `Array#includes` 연산을 할 때 type assertion의 불편함을 해소해주는 유틸리티 함수입니다.
 *
 * ```typescript
 * arrayIncludes<Type>(
 *   // 원소가 포함되었는지 검사할 배열
 *   arr: Type[],
 *   // 배열에 포함되었는지 검사할 원소
 *   item: unknown,
 *   // 찾기 시작할 index
 *   fromIndex?: number
 * ): item is Type
 * ```
 * @example
 * const arr = ['a', 'b', 'c'] as const;
 *
 * const element: string = 'a';
 *
 * // arrayIncludes 를 사용하면 Type Error 없이 포함되었는지 여부를 검사할 수 있습니다.
 * arrayIncludes(arr, element)
 *
 * // Array#includes 를 사용하면 Type Error가 발생합니다.
 * arr.includes(element);
 */
export function arrayIncludes<Type>(array: Type[] | readonly Type[], item: unknown, fromIndex?: number): item is Type {
  return array.includes(item as Type, fromIndex);
}
