/**
 * @name stripUndefined
 * 사용하지 않는 함수입니다.
 * @deprecated v18에서 제거 예정
 */
export function stripUndefined<T extends object>(target: T): { [K in keyof T]-?: NonNullable<T[K]> } {
  return Object.keys(target).reduce((acc, currKey) => {
    if (currKey === undefined) {
      return acc;
    }

    return {
      ...acc,
      [currKey]: (target as any)[currKey],
    };
  }, {}) as any;
}
