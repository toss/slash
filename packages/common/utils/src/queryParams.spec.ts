import { parseQueryParamBoolean, getStringQueryParam, getNumberQueryParam } from '.';

describe('queryParams', () => {
  test('parseQueryParamBoolean', () => {
    expect(parseQueryParamBoolean(undefined)).toEqual(null);
    expect(parseQueryParamBoolean([])).toEqual(null);
    expect(parseQueryParamBoolean(['true'])).toEqual(null);
    expect(parseQueryParamBoolean('blah')).toEqual(null);
    expect(parseQueryParamBoolean('true')).toEqual(true);
    expect(parseQueryParamBoolean('false')).toEqual(false);
  });

  test('parseQuerygetStringQueryParamParamBoolean', () => {
    expect(getStringQueryParam(undefined)).toEqual(null);
    expect(getStringQueryParam([])).toEqual(null);
    expect(getStringQueryParam(['string'])).toEqual(null);
    expect(getStringQueryParam('string')).toEqual('string');
  });

  test('getNumberQueryParam', () => {
    expect(getNumberQueryParam(undefined)).toEqual(null);
    expect(getNumberQueryParam([])).toEqual(null);
    expect(getNumberQueryParam(['string'])).toEqual(null);
    expect(getNumberQueryParam('string')).toEqual(null);
    expect(getNumberQueryParam('a1232')).toEqual(null);
    expect(getNumberQueryParam('123a123')).toEqual(123);
    expect(getNumberQueryParam('123')).toEqual(123);
  });
});
