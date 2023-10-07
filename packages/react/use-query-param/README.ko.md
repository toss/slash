# useQueryParam

`@toss/use-query-param` 는 쿼리 파라미터 값을 가져오는데 도움이 되는 라이브러리입니다.

## 설치

```shell
npm install @toss/use-query-param
```

```shell
yarn add @toss/use-query-param
```

```shell
pnpm add @toss/use-query-param
```

## API

### `useQueryParam(name, option)`

```typescript
useQueryParam(name, option);
```

| option   | 설명                             | 필수 여부 |
| -------- | -------------------------------- | --------- |
| suspense | suspense를 사용할 때 사용합니다. | x         |
| parser   | 형변환을 할 때 사용합니다.       | x         |

`suspense:true`를 추가하지 않을 경우 next/router의 Router가 준비되지 않아 초기에 undefined를 리턴할 수 있습니다.

#### 사용 예시

```typescript
const type = useQueryParam('type');
// suspense
const type = useQueryParam('type', { suspense: true });
// suspense, parser
const type = useQueryParam('type', { suspense: true, parser: Number });
```

- https://toss.im/page?type=c -> 'c'
- https://toss.im/page -> undefined

### `useQueryParams()`

```typescript
useQueryParams<T extends { [key: string]: string } = { [key: string]: string }>(): Partial<T>
```

#### 사용 예시

```typescript
// 한 개
const { foo } = useQueryParams<{ foo: string }>();

// 다수
const { foo, toss } = useQueryParams<{ foo: string; toss: string }>();
```

- `https://toss.im/page -> undefined`
- `https://toss.im/page?foo=bar -> { foo: bar }`
- `https://toss.im/page?foo=bar&toss=core -> { foo: bar, toss: core }`
