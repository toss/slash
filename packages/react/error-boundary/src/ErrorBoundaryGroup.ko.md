# ErrorBoundaryGroup

다수의 ErrorBoundary들을 한 번에 관리하기 위한 컴포넌트입니다.

ErrorBoundaryGroup을 사용하면 다수의 ErrorBoundary의 resetKeys에 일일이 resetKey상태를 연결해주지 않아도 ErrorBoundaryGroup의 children으로 있다면 ErrorBoundary들을 쉽게 한 번에 reset할 수 있습니다.

## Example

```jsx
const Example = () => (
  <ErrorBoundaryGroup>
    <ErrorBoundaryGroupReset trigger={({ reset }) => <button onClick={reset}>Reset All</button>} />
    <ErrorBoundary />
    <ErrorBoundary />
    <NestedErrorBoundary />
  </ErrorBoundaryGroup>
);

const NestedErrorBoundary = () => {
  return <ErrorBoundary />;
};

const ErrorBoundaryGroupReset = ({ trigger: Trigger }) => {
  const { reset } = useErrorBoundaryGroup(); // ErrorBoundaryGroup의 children으로 있는 ErrorBoundary들이 내부적으로 공유하는 resetKey를 새로 발급해 모두 reset 하고 싶다면 useErrorBoundaryGroup hook을 활용하면 됩니다.

  return <Trigger reset={reset} />;
};
```

## Motivation

여러 ErrorBoundary들을 fallback의 외부에서 한번에 reset하기 위해서는 같은 resetKey를 공유하는 resetKeys을 활용할 수 있습니다.
그러나 많은 ErrorBoundary를 한번에 reset하기 위해 resetKeys에 resetKey를 연결해야 한다면 해당 resetKey상태를 만들고 일일이 연결해줘야 하는 점이 불편합니다.

또한 ErrorBoundary가 컴포넌트 내부에서 사용된다면 ErrorBoundary를 사용하는 컴포넌트에서 resetKey를 받는 prop을 만들어 직접 연결해주어야 합니다. 이는 prop-drilling으로 코드의 가독성을 저하시킬 수 있습니다.

문제 상황을 쉽게 이해할 수 있게 아래 예시 코드를 작성했습니다.

```jsx
const Example = () => {
  const [resetKey, setResetKey] = useState(0); // 이런 상태는 연관이 있는 코드와 멀어집니다.

  // ... some implementation

  const resetAll = useCallback(() => {
    setResetKey(prev => prev + 1);
  });

  // ... some implementation

  return (
    <Fragment>
      <button onClick={resetAll}>Reset All</button>
      <ErrorBoundary resetKeys={[resetKey]} /* resetKeys에 공유되는 resetKey를 일일이 연결해야 합니다. */ />
      <ErrorBoundary resetKeys={[resetKey]} />
      <NestedErrorBoundary resetKey={resetKey} />
    </Fragment>
  );
};

const NestedErrorBoundary = ({
  resetKey, // 컴포넌트 내부에서 사용되는 ErrorBoundary에게 resetKey를 전달하기 위해 prop drilling이 필요합니다.
}) => {
  // ... some implementation

  return <ErrorBoundary resetKeys={[resetKey]} />;
};
```

위 코드처럼 ErrorBoundary들이 공유하는 resetKey를 관리하기 위해 관련 코드를 산재되게 하고 반복되는 코드가 많아집니다. 이는 많은 파일과 산재된 위치의 코드를 변경시키고 장기적인 관리를 어렵게 할 수 있습니다.

ErrorBoundaryGroup은 이러한 불편함을 선언적으로 해결합니다.

## References

- [ErrorBoundaryGroup Pull Request](https://github.com/toss/slash/pull/157)
- [@suspensive/react's ErrorBoundaryGroup](https://suspensive.org/ko/docs/react/ErrorBoundaryGroup)
