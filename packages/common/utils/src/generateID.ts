let nextUniqueId = 0;

/**
 * @name generateID
 * @description
 * 고유한 ID를 생성합니다.
 * ```typescript
 * generateID(
 *   // ID의 prefix
 *   // @default ''
 *   prefix: string
 * ): string
 * ```
 *
 * @example
 * generateID('toss') // 'toss1'
 * generateID('toss') // 'toss2'
 * generateID('toss') // 'toss3'
 */
export function generateID(prefix = '') {
  nextUniqueId = nextUniqueId + 1;
  return `${prefix}${nextUniqueId}`;
}
