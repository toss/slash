import { createQueryString, createSearchParamString, parseQueryString, QS } from './queryString';

describe('parseQueryString은', () => {
  it('정상적으로 query string을 파싱한다.', () => {
    const result = parseQueryString<{ foo: string; bar: string }>('?foo=bar&bar=baz');

    expect(result.foo).toEqual('bar');
    expect(result.bar).toEqual('baz');
  });

  it('정상적으로 인코딩된 query string을 파싱한다.', () => {
    const url = 'https://toss.im';

    const result = parseQueryString<{ url: string }>(
      createQueryString({
        url: url,
      })
    );

    expect(result.url).toEqual(url);
  });

  /**
   * @see https://tossteam.slack.com/archives/C02H1T51D71/p1642611353185700?thread_ts=1642603925.184000&cid=C02H1T51D71
   * @see https://stackoverflow.com/questions/31670413/plus-sign-in-encoded-url
   */
  it('space가 포함된 문자열을 RFC3986에 맞게 잘 디코딩한다', () => {
    const result = parseQueryString<{ prop1: string }>('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');

    expect(result.prop1).toEqual('정치 후원금');
  });

  it('space가 포함된 문자열의 배열을 RFC3986에 맞게 잘 디코딩한다', () => {
    const result = parseQueryString<{ prop4: string[] }>(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
    expect(result.prop4).toHaveLength(2);
    expect(result.prop4).toContain('정치 후원금');
    expect(result.prop4).toContain('마이 데이터');
  });

  it('+가 포함된 문자열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const result = parseQueryString<{ prop1: string }>('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
    expect(result.prop1).toEqual('정치+후원금');
  });
});

interface Params {
  prop1?: string;
  prop2?: number;
  prop3?: undefined;
  prop4?: string[];
}

describe('createQueryString은', () => {
  it('빈 객체를 받으면 빈 문자열을 반환한다.', () => {
    const params: Params = {};
    const result = createQueryString(params);

    expect(result).toEqual('');
  });

  it('object를 받으면 정상적인 queryString을 반환한다.', () => {
    const params: Params = {
      prop1: 'prop1',
      prop2: 2,
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=prop1&prop2=2');
  });

  it('배열을 받으면 정상적인 queryString을 반환한다.', () => {
    const params: Params = {
      prop1: 'prop1',
      prop2: 2,
      prop3: undefined,
      prop4: ['a', 'b'],
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=prop1&prop2=2&prop4=a&prop4=b');
  });

  /**
   * @see https://tossteam.slack.com/archives/C02H1T51D71/p1642611353185700?thread_ts=1642603925.184000&cid=C02H1T51D71
   * @see https://stackoverflow.com/questions/31670413/plus-sign-in-encoded-url
   */
  it('space가 포함된 문자열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const params: Params = {
      prop1: '정치 후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');
  });

  it('space가 포함된 문자열의 배열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const params: Params = {
      prop4: ['정치 후원금', '마이 데이터'],
    };
    const result = createQueryString(params);

    expect(result).toEqual(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
  });

  it('+가 포함된 문자열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const params: Params = {
      prop1: '정치+후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
  });
});

describe('createSearchParamString은', () => {
  it('전달받은 params을 프로토콜 규약에 맞게 파싱한다.', () => {
    const params = {
      foo: '1',
      bar: 2,
      baz: ['a', 'b', 'c'],
    };

    const result = createSearchParamString(params);

    expect(result).toEqual('foo=1&bar=2&baz=a&baz=b&baz=c');
  });

  it('space가 포함된 문자열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const params: Params = {
      prop1: '정치 후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');
  });

  it('space가 포함된 문자열의 배열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const params: Params = {
      prop4: ['정치 후원금', '마이 데이터'],
    };
    const result = createQueryString(params);

    expect(result).toEqual(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
  });

  it('+가 포함된 문자열을 RFC3986에 맞게 잘 인코딩한다', () => {
    const params: Params = {
      prop1: '정치+후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
  });
});

describe('QS.set', () => {
  it('쿼리 파라미터를 RFC 3986에 따라 설정한다.', () => {
    expect(QS.set('?with_space=hi%20hi', 'referrer', 'foo')).toMatchInlineSnapshot(
      `"?with_space=hi%20hi&referrer=foo"`
    );
    expect(QS.set('?referrer=foo', 'with_space', 'foo bar')).toMatchInlineSnapshot(
      `"?referrer=foo&with_space=foo%20bar"`
    );
  });
});
