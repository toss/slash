# queryString

## queryString & QS

queryString과 관련된 유틸리티 함수를 모아놓은 모듈입니다. `QS`는 세 유틸리티 함수들을 묶어서 export한 객체입니다.

### createQueryString (QS.create)

GET 파라미터로 전달되는 쿼리 스트링을 제작합니다.
주의: params가 비었을 경우, 빈 문자열을 반환하지만, params에 키-값 쌍이 존재하면 `?`가 앞에 추가됩니다.

```ts
{ a: 1, b: 2, c: '가나다' } // => '?a=1&b=2&c=%EA%B0%80%EB%82%98%EB%8B%A4',
{} // => ''
```

첫 번째 파라미터 Record의 key는 string이고, 값은 string | number | string[] | number[]이어야 합니다.

### createSearchParamString

전달하는 object의 nilable value를 필터링하고 URLSearchParams로 파싱하고 string을 반환합니다. 인코딩은 [RFC3986]을 기준으로 합니다.

```ts
createSearchParamString({ foo: 1, bar: ['a', 'b'], baz: undefined }); // => foo=1&bar=a&bar=b
```

### parseQueryString (QS.parse)

URL 쿼리 문자열을 파싱하여 타입 파라미터 `Result` 형식으로 반환합니다.

parseQueryString을 첫 번째 파라미터 없이 사용하는 것은 SSR unsafe합니다.

```ts
type Result = { foo: string; bar: string };
parseQueryString<Result>('?foo=bar&bar=baz'); // { foo: bar, bar: baz }
```

### setQueryString (QS.set)

URL의 `search`에 새 쿼리 파라미터를 추가합니다.

```ts
QS.set('?foo=bar', 'baz', 'quux') === '?foo=bar&baz=quux';
```
