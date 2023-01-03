# ErrorBoundaryGroup

This is a component for managing multiple ErrorBoundaries at once.

If you use ErrorBoundaryGroup, you can easily reset multiple ErrorBoundaries at once if they are children of ErrorBoundaryGroup, without having to connect resetKey state to resetKeys of multiple ErrorBoundary.

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
  const { reset } = useErrorBoundaryGroup(); // If you want to reset all ErrorBoundaryGroup by generating a new resetKey shared internally by ErrorBoundaryGroup children, use the useErrorBoundaryGroup hook.

  return <Trigger reset={reset} />;
};
```

## Motivation

To reset multiple ErrorBoundaries at once outside of fallback, you can use resetKeys that share the same resetKey.
However, if you need to connect the resetKey to resetKeys to reset many ErrorBoundaries at once, it is inconvenient to create the corresponding resetKey state and connect it one by one.

Also, if ErrorBoundary is used inside a component, you must create a prop that receives resetKey from the component that uses ErrorBoundary and connect it directly. This is prop-drilling and can reduce the readability of your code.

Below example code to make it easier to understand the problem situation.

```jsx
const Example = () => {
  const [resetKey, setResetKey] = useState(0); // This state is far from the relevant code.

  // ... some implementation

  const resetAll = useCallback(() => {
    setResetKey(prev => prev + 1);
  });

  // ... some implementation

  return (
    <Fragment>
      <button onClick={resetAll}>Reset All</button>
      <ErrorBoundary
        resetKeys={[resetKey]} /* The resetKey shared by multiple ErrorBoundaries must be connected individually. */
      />
      <ErrorBoundary resetKeys={[resetKey]} />
      <NestedErrorBoundary resetKey={resetKey} />
    </Fragment>
  );
};

const NestedErrorBoundary = ({
  resetKey, // Prop drilling is required to pass the resetKey to the ErrorBoundary used inside the component.
}) => {
  // ... some implementation

  return <ErrorBoundary resetKeys={[resetKey]} />;
};
```

As in the code above, to manage the resetKey shared by ErrorBoundaries, related codes are scattered and repeated codes increase. This can lead to many files and code changes in scattered locations and make long-term maintenance difficult.

ErrorBoundaryGroup solves this annoyance declaratively.

## Reference

- [ErrorBoundaryGroup Pull Request](https://github.com/toss/slash/pull/157)
- [@suspensive/react's ErrorBoundaryGroup.Reset](https://react.suspensive.org/docs/reference/ErrorBoundary#errorboundarygroupreset)
