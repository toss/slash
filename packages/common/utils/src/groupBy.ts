/**
 * @name groupBy
 * @description
 * 배열을 특정 키에 따라 그룹화합니다.
 * ```typescript
 * groupBy<T>(
 *   // 그룹화할 배열
 *   array: T[],
 *   // 그룹화 기준이 되는 키를 만드는 함수
 *   createKey: (item: T) => string
 * ): Record<string, T[]>
 * ```
 *
 * @example
 * const input = [
 *   { groupName: '부엉이', value: 1 },
 *   { groupName: '다람쥐', value: 2 },
 *   { groupName: '너구리', value: 3 },
 *   { groupName: '너구리', value: 4 },
 *   { groupName: '너구리', value: 5 },
 *   { groupName: '부엉이', value: 6 },
 * ];
 *
 * groupBy(input, ({ groupName }) => groupName);
 * // =>
 * // {
 * //   부엉이: [
 * //     { groupName: '부엉이', value: 1 },
 * //     { groupName: '부엉이', value: 6 },
 * //   ],
 * //   다람쥐: [{ groupName: '다람쥐', value: 2 }],
 * //   너구리: [
 * //     { groupName: '너구리', value: 3 },
 * //     { groupName: '너구리', value: 4 },
 * //     { groupName: '너구리', value: 5 },
 * //   ],
 * // }
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_groupby
 */
export function groupBy<T>(data: T[], createKey: (item: T) => string) {
  return data.reduce((result: Record<string, T[]>, current) => {
    const key = createKey(current);
    const value = result[key];
    if (value == null) {
      result[key] = [current];
    } else {
      value.push(current);
    }
    return result;
  }, {});
}
