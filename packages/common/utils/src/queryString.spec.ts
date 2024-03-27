import { QS } from './queryString';

describe('QS.parse', () => {
  it('should correctly parse a query string.', () => {
    const result = QS.parse<{ foo: string; bar: string }>('?foo=bar&bar=baz');

    expect(result.foo).toEqual('bar');
    expect(result.bar).toEqual('baz');
  });

  it('should correctly parse an encoded query string.', () => {
    const url = 'https://toss.im';

    const result = QS.parse<{ url: string }>(
      QS.create({
        url: url,
      })
    );

    expect(result.url).toEqual(url);
  });

  /**
   * @see https://stackoverflow.com/questions/31670413/plus-sign-in-encoded-url
   */
  it('should correctly decode a string with spaces according to RFC3986.', () => {
    const result = QS.parse<{ prop1: string }>('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');

    expect(result.prop1).toEqual('정치 후원금');
  });

  it('should correctly decode an array of strings with spaces according to RFC3986.', () => {
    const result = QS.parse<{ prop4: string[] }>(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
    expect(result.prop4).toHaveLength(2);
    expect(result.prop4).toContain('정치 후원금');
    expect(result.prop4).toContain('마이 데이터');
  });

  it('should correctly encode a string containing a + according to RFC3986.', () => {
    const result = QS.parse<{ prop1: string }>('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
    expect(result.prop1).toEqual('정치+후원금');
  });
});

interface Params {
  prop1?: string;
  prop2?: number;
  prop3?: undefined;
  prop4?: string[];
}

describe('QS.create', () => {
  it('should return an empty string when given an empty object.', () => {
    const params: Params = {};
    const result = QS.create(params);

    expect(result).toEqual('');
  });

  it('should return a valid queryString when given an object.', () => {
    const params: Params = {
      prop1: 'prop1',
      prop2: 2,
    };
    const result = QS.create(params);

    expect(result).toEqual('?prop1=prop1&prop2=2');
  });

  it('should return a valid queryString when given an array.', () => {
    const params: Params = {
      prop1: 'prop1',
      prop2: 2,
      prop3: undefined,
      prop4: ['a', 'b'],
    };
    const result = QS.create(params);

    expect(result).toEqual('?prop1=prop1&prop2=2&prop4=a&prop4=b');
  });

  /**
   * @see https://stackoverflow.com/questions/31670413/plus-sign-in-encoded-url
   */
  it('should correctly encode a string with spaces according to RFC3986.', () => {
    const params: Params = {
      prop1: '정치 후원금',
    };
    const result = QS.create(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88');
  });

  it('should correctly encode an array of strings with spaces according to RFC3986.', () => {
    const params: Params = {
      prop4: ['정치 후원금', '마이 데이터'],
    };
    const result = QS.create(params);

    expect(result).toEqual(
      '?prop4=%EC%A0%95%EC%B9%98%20%ED%9B%84%EC%9B%90%EA%B8%88&prop4=%EB%A7%88%EC%9D%B4%20%EB%8D%B0%EC%9D%B4%ED%84%B0'
    );
  });

  it('should correctly encode a string containing + according to RFC3986.', () => {
    const params: Params = {
      prop1: '정치+후원금',
    };
    const result = QS.create(params);

    expect(result).toEqual('?prop1=%EC%A0%95%EC%B9%98%2B%ED%9B%84%EC%9B%90%EA%B8%88');
  });
});

describe('QS.get', () => {
  beforeEach(() => {
    QS.parse = jest.fn().mockImplementation(() => ({
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: '40',
    }));
  });

  it('should correctly return an existing single string value', () => {
    const name = QS.get('prop1');
    expect(name).toEqual('prop1');
  });

  it('should return undefined for a non-existing key', () => {
    const result = QS.get('prop4');
    expect(result).toBeUndefined();
  });

  it('should apply a parser function to convert a string to a number', () => {
    const age = QS.get('prop3', Number);
    expect(age).toEqual(40);
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
