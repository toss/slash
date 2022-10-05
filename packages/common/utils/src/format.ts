/**
 * @name maskName
 * @description
 * 토스에서 사용하는 마스킹 방법에 맞게 이름의 가운데 글자들을 마스킹합니다.
 *
 * ex) 허재 -> 허*, 나토스 -> 나*스, 제갈토스 -> 제**스, `NA TO SEU` -> `N*******U`
 *
 * ```typescript
 * maskName(
 *   // 마스킹할 이름
 *   name: string,
 *   options: {
 *     // 마스킹 시 사용할 문자
 *     // @default '*'
 *     maskChar?: string;
 *   }
 * }): string
 * ```
 *
 * @example
 * maskName('허재') // '허*'
 * maskName('나토스') // '나*스'
 * maskName('제갈토스') // '제**스'
 * maskName('NA TO SEU') // 'N*******U'
 * maskName('박토스', { maskChar: '#' }) // '허#'
 */
export function maskName(name: string, { maskChar = '*' }: { maskChar?: string } = {}) {
  const firstLetter = name.slice(0, 1);

  // 두 글자 이름인 경우, 두 번째 글자를 마스킹해야 하기 때문에
  // 마스킹을 하지 않는 마지막 글자의 최소 시작 인덱스는 2가 된다.
  const lastLetterIndex = Math.max(2, name.length - 1);
  const lastLetter = name.slice(lastLetterIndex);

  const middleLength = name.length - 1 - lastLetter.length;
  const middle = Array.from({ length: middleLength }).fill(maskChar).join('');

  return `${firstLetter}${middle}${lastLetter}`;
}
