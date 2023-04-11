# useQueryParam

`@toss/use-query-param` is a library that helps you get query parameter values.

## Install

```shell
yarn add @toss/use-query-param
```

## API

### `useQueryParam(name, option)`

```typescript
useQueryParam(name, option);
```

| option   | description              | required |
| -------- | ------------------------ | -------- |
| suspense | Use when using suspense. | x        |
| parser   | Used to perform casting. | x        |

If you do not add `suspense:true`, next/router may return undefined initially because the router is not ready.

#### Example

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

#### Example

```typescript
// One
const { foo } = useQueryParams<{ foo: string }>();

// Multiple
const { foo, toss } = useQueryParams<{ foo: string; toss: string }>();
```

- `https://toss.im/page -> undefined`
- `https://toss.im/page?foo=bar -> { foo: bar }`
- `https://toss.im/page?foo=bar&toss=core -> { foo: bar, toss: core }`
