/** @tossdocs-ignore */
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
