import { createQueryString, createSearchParamString, parseQueryString, QS } from './queryString';

describe('parseQueryString', () => {
  it('should correctly parse a query string.', () => {
    const result = parseQueryString<{ foo: string; bar: string }>('?foo=bar&bar=baz');

    expect(result.foo).toEqual('bar');
    expect(result.bar).toEqual('baz');
  });

  it('should correctly parse an encoded query string.', () => {
    const url = 'https://toss.im';

    const result = parseQueryString<{ url: string }>(
      createQueryString({
        url: url,
      })
    );

    expect(result.url).toEqual(url);
  });

  /**
   * @see https://stackoverflow.com/questions/31670413/plus-sign-in-encoded-url
   */
  it('should correctly decode a string with spaces according to RFC3986.', () => {
    const result = parseQueryString<{ prop1: string }>('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');

    expect(result.prop1).toEqual('정치 후원금');
  });

  it('should correctly decode an array of strings with spaces according to RFC3986.', () => {
    const result = parseQueryString<{ prop4: string[] }>(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
    expect(result.prop4).toHaveLength(2);
    expect(result.prop4).toContain('정치 후원금');
    expect(result.prop4).toContain('마이 데이터');
  });

  it('should correctly encode a string containing a + according to RFC3986.', () => {
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

describe('createQueryString', () => {
  it('should return an empty string when given an empty object.', () => {
    const params: Params = {};
    const result = createQueryString(params);

    expect(result).toEqual('');
  });

  it('should return a valid queryString when given an object.', () => {
    const params: Params = {
      prop1: 'prop1',
      prop2: 2,
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=prop1&prop2=2');
  });

  it('should return a valid queryString when given an array.', () => {
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
   * @see https://stackoverflow.com/questions/31670413/plus-sign-in-encoded-url
   */
  it('should correctly encode a string with spaces according to RFC3986.', () => {
    const params: Params = {
      prop1: '정치 후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');
  });

  it('should correctly encode an array of strings with spaces according to RFC3986.', () => {
    const params: Params = {
      prop4: ['정치 후원금', '마이 데이터'],
    };
    const result = createQueryString(params);

    expect(result).toEqual(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
  });

  it('should correctly encode a string containing + according to RFC3986.', () => {
    const params: Params = {
      prop1: '정치+후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
  });
});

describe('createSearchParamString', () => {
  it('should correctly parse the given params according to protocol specifications.', () => {
    const params = {
      foo: '1',
      bar: 2,
      baz: ['a', 'b', 'c'],
    };

    const result = createSearchParamString(params);

    expect(result).toEqual('foo=1&bar=2&baz=a&baz=b&baz=c');
  });

  it('should correctly encode a string with spaces according to RFC3986.', () => {
    const params: Params = {
      prop1: '정치 후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');
  });

  it('should correctly encode an array of strings with spaces according to RFC3986.', () => {
    const params: Params = {
      prop4: ['정치 후원금', '마이 데이터'],
    };
    const result = createQueryString(params);

    expect(result).toEqual(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
  });

  it('should correctly encode a string containing a + according to RFC3986.', () => {
    const params: Params = {
      prop1: '정치+후원금',
    };
    const result = createQueryString(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
  });
});

describe('QS.set', () => {
  it('should set query parameters according to RFC 3986.', () => {
    expect(QS.set('?with_space=hi%20hi', 'referrer', 'foo')).toMatchInlineSnapshot(
      `"?with_space=hi%20hi&referrer=foo"`
    );
    expect(QS.set('?referrer=foo', 'with_space', 'foo bar')).toMatchInlineSnapshot(
      `"?referrer=foo&with_space=foo%20bar"`
    );
  });
});
