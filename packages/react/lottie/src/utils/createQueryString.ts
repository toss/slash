/** @tossdocs-ignore */
/**
 * GET 파라미터로 전달되는 쿼리 스트링을 제작합니다.
 * 주의: params가 비었을 경우, 빈 문자열을 반환하지만, params에 키-값 쌍이 존재하면 `?`가 앞에 추가됩니다.
 * 예) { a: 1, b: 2, c: '가나다' } => '?a=1&b=2&c=%EA%B0%80%EB%82%98%EB%8B%A4',
 * {} => ''
 * @param  {Params} params 프로퍼티의 이름은 string이고, 값은 string | number | string[] | number[]이어야 합니다.
 */
export function createQueryString(params: Record<string, any>) {
  const queryString = createSearchParamString(params);

  if (queryString === '') {
    return '';
  }

  return `?${queryString}`;
}

/**
 * 전달하는 object를  nilable value를 필터링하고 URLSearchParams로 파싱하고 string을 반환합니다.
 * @example
 * createSearchParamString({ foo: 1, bar: ['a', 'b'], baz: undefined }) // foo=1&bar=a&bar=b
 * @param params query로 변환하고자 하는 object
 */
function createSearchParamString(params: Record<string, any>) {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(x => [key, x]);
        }
        return [[key, value]];
      })
      .flat()
  ).toString();
}
