/** @tossdocs-ignore */
/*
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

/*
 * 전달하는 object를  nilable value를 필터링하고 URLSearchParams로 파싱하고 string을 반환합니다.
 * @example
 * createSearchParamString({ foo: 1, bar: ['a', 'b'], baz: undefined }) // foo=1&bar=a&bar=b
 * @param params query로 변환하고자 하는 object
 */
export function createSearchParamString(params: Record<string, any>) {
  return (
    new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map(x => [key, x]);
          }
          return [[key, value]];
        })
        .flat()
    )
      .toString()
      // RFC1738 -> RFC3986 스펙에 맞게 space character를 변환합니다.
      .replace(/\+/g, '%20')
  );
}

/*
 * URL 쿼리 문자열을 파싱하여 타입 파라미터 `Result` 형식으로 반환합니다.
 * @param [queryString=location.search] - 파싱 대상 문자열(`?foo=bar` 형태), 기본값 `location.search`
 * @warn
 * parseQueryString을 첫 번째 파라미터 없이 사용하는 것은 SSR unsafe합니다.
 * 페이지의 query parameter(location.search)를 사용해야 하는 경우 `@tossteam/use-query-param`을 사용해주세요.
 */
export function parseQueryString<Result = Record<string, string>>(
  queryString: string = typeof location !== 'undefined' ? location.search : ''
): Result {
  const query = queryString.trim().replace(/^[?#&]/, '');

  return fromEntries(new URLSearchParams(query)) as any;
}

function fromEntries<T extends readonly [string | number, unknown]>(iterable: Iterable<T>) {
  const result: Record<string | number | symbol, T[1]> = {};

  for (const [key, value] of Array.from(iterable)) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        (result[key] as Array<string | number>).push(value as string | number);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

function getQueryString(name: string): string | undefined;
function getQueryString<T>(name: string, parser: (val: string) => T): T | undefined;

/**
 * @deprecated
 * getQueryString은 SSR unsafe합니다.
 * 페이지의 query parameter(location.search)를 사용해야 하는 경우 `@tossteam/use-query-param`을 사용해주세요.
 */
function getQueryString<T = string>(name: string, parser?: (val: string) => T) {
  const value = QS.parse<{ [name: string]: string | undefined }>()[name];

  if (parser == null || value == null) {
    return value;
  } else {
    return parser(value);
  }
}

export function setQueryString(search: string, key: string, value: string) {
  const parsed = parseQueryString(search);

  return createQueryString({
    ...parsed,
    [key]: value,
  });
}

/**
 * @name QS
 * @description
 * queryString과 관련된 유틸리티 함수를 모아놓은 모듈입니다. `QS`는 세 유틸리티 함수들을 묶어서 export한 객체입니다.
 */
export const QS = {
  /**
   * @name QS.create (createQueryString)
   * @description
   * GET 파라미터로 전달되는 쿼리 스트링을 제작합니다.
   *
   * - 첫 번째 파라미터 Record의 key는 string이고, 값은 string | number | string[] | number[]이어야 합니다.
   * - 주의: params가 비었을 경우, 빈 문자열을 반환하지만, params에 키-값 쌍이 존재하면 `?`가 앞에 추가됩니다.
   *
   * ```typescript
   * QS.create(
   *   // 쿼리 파라미터로 바꿀 문자열
   *   obj: Record<string, string | number | string[] | number[]>
   * ): string
   * ```
   *
   * @example
   * QS.create({ a: 1, b: 2, c: '가나다' }) // => '?a=1&b=2&c=%EA%B0%80%EB%82%98%EB%8B%A4'
   * QS.create({}) // => ''
   */
  create: createQueryString,
  /**
   * @name QS.parse (parseQueryString)
   * @description
   * URL 쿼리 문자열을 파싱하여 타입 파라미터 `Result` 형식으로 반환합니다.
   *
   * - 주의: QS.parse를 첫 번째 파라미터 없이 사용하는 것은 SSR unsafe합니다. 페이지의 query parameter(location.search)를 사용해야 하는 경우 `@tossteam/use-query-param`을 사용해주세요.
   *
   * ```typescript
   * QS.parse<Result = Record<string, string>>(
   *   // 파싱할 쿼리 스트링
   *   // @default location.search 값
   *   queryString: string
   * ): Result
   * ```
   *
   * @example
   * QS.parse('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88') // { 'prop1': '정치 후원금' }
   */
  parse: parseQueryString,
  /**
   * @name QS.get (getQueryString)
   * @description
   * 현재 쿼리 파라미터의 값을 가져옵니다.
   *
   * ```typescript
   * QS.get<T>(
   *   // 가져올 쿼리 파라미터의 키
   *   name: string
   * ): T
   * ```
   * @deprecated
   * QS.get은 SSR unsafe합니다.
   * 페이지의 query parameter(location.search)를 사용해야 하는 경우 `@tossteam/use-query-param`을 사용해주세요.
   */
  get: getQueryString,
  /**
   * @name QS.set (setQueryString)
   * 주어진 쿼리 스트링에 새로운 값을 추가하거나, 값을 수정합니다.
   * ```typescript
   * QS.set(
   *   // 수정할 쿼리 파라미터 문자열
   *   qs: string
   *   // 추가할 쿼리 파라미터의 키
   *   key: string,
   *   // 추가할 쿼리 파라미터의 값
   *   value: string
   * ): string
   * ```
   * @example
   * QS.set('?with_space=hi%20hi', 'referrer', 'foo') // '?with_space=hi%20hi&referrer=foo'
   */
  set: setQueryString,
};
