# range

`start` 에서 시작하여 `end` 바로 전에 끝나는 숫자 배열을 반환합니다.
`end`를 생략하는 경우, 0부터 첫 번째 인자 `end` 바로 전까지의 숫자들을 반환합니다.
반환되는 배열에서 `end` 는 포함되지 않으므로 주의하세요.

```typescript
range(
  // 시작할 숫자
  start: number,
  // 끝날 숫자 (주의: `end` 는 포함되지 않습니다)
  end: number,
  // 배열에 포함될 숫자의 간격
  // @default 1
  step?: number
): number[];
```

## Example

see https://lodash.com/docs/4.17.15#range

```typescript
range(1, 5); // [1, 2, 3, 4]

// end를 생략하는 경우
range(4); // [0, 1, 2, 3]

// step으로 숫자의 간격을 설정할 수 있습니다.
range(1, 11, 3); // [1, 4, 7, 10]
```
