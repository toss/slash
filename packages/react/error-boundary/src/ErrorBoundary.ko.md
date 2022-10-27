---
title: ErrorBoundary
---

# ErrorBoundary

선언적으로 에러를 관리하기 위해서 사용하는 컴포넌트입니다.
`ErrorBoundary` 컴포넌트는 children의 render/useEffect에서 발생한 에러를 잡아
`renderFallback`으로 주어진 컴포넌트를 렌더링합니다.

## Examples

```jsx
<ErrorBoundary
  // 에러가 발생하면 그려질 컴포넌트입니다.
  // 첫 번째 인자는 잡힌 에러를 나타냅니다.
  renderFallback={error => <div>에러가 발생했어요. {error.message}</div>}
  // 에러가 발생하면 호출되는 callback입니다.
  // 첫 번째 인자는 잡힌 에러, 두 번째 인자는 에러가 발생한 컴포넌트의 stack을 나타냅니다.
  // componentStack의 타입은 `string` 입니다.
  onError={(error, { componentStack }) => {
    alert(error.message);
    console.log(componentStack);
  }}
  // 배열 안에 담긴 값이 바뀌면 ErrorBoundary로 잡힌 에러를 초기화합니다.
  // 값이 동일한지 여부는 `Object.is()` 로 검증합니다.
  // @default []
  resetKeys={['key1', 'key2']}
  // 에러가 초기화되면 호출됩니다.
  // 타입은 `() => void` 입니다.
  onReset={() => {}}
  // 잡힌 에러를 무시하고 다시 throw 할지 여부를 반환합니다.
  // true 가 반환될 경우, error를 이 ErrorBoundary에서 잡지 않고 throw 합니다.
  ignoreError={error => error.message.includes('어쩌구')}
>
  <에러를_발생시킬_수_있는_컴포넌트 />
</ErrorBoundary>
```

## References

https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
