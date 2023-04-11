# queryString

## queryString & QS

This module is a collection of utility functions related to queryString. The `QS` is an exported object that bundles the three utility functions.

### createQueryString (QS.create)

Create a query string that is passed as a GET parameter.
Note: If params is empty, it returns an empty string, but if a key-value pair exists in params, it is prefixed with `?`.

```ts
{ a: 1, b: 2, c: '가나다' } // => '?a=1&b=2&c=%EA%B0%80%EB%82%98%EB%8B%A4',
{} // => ''
```

The first parameter, Record, must have a key of string and a value of string | number | string[] | number[].

### createSearchParamString

Filters the passing object for nilable values, parses it as URLSearchParams, and returns a string. The encoding is based on [RFC3986].

```ts
createSearchParamString({ foo: 1, bar: ['a', 'b'], baz: undefined }); // => foo=1&bar=a&bar=b
```

### parseQueryString (QS.parse)

Parses a URL query string and returns it as a type parameter `Result`.

Using parseQueryString without the first parameter is SSR unsafe.

```ts
type Result = { foo: string; bar: string };
parseQueryString<Result>('?foo=bar&bar=baz'); // { foo: bar, bar: baz }
```

### setQueryString (QS.set)

Add a new query parameter to `search` in the URL.

```ts
QS.set('?foo=bar', 'baz', 'quux') === '?foo=bar&baz=quux';
```
