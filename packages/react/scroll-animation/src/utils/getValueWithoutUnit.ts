/** @tossdocs-ignore */
/**
 * 단위가 포함된 값을 입력받아 숫자 부분만 number로 변환하여 리턴합니다.
 *
 * e.g.
 * - getValueWithoutUnit('50vh') => 50
 * - getValueWithoutUnit('300%') => 300
 *
 * @param stringValue 단위가 포함된 스트링
 */
export function getValueWithoutUnit(stringValue: string) {
  const numberValue = parseInt(stringValue);
  if (isNaN(numberValue)) {
    throw new Error(`올바른 형식인지 확인해주세요. stringValue: ${stringValue}`);
  }
  return numberValue;
}
