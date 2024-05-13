---
title: RedirectionBoundary
---

# RedirectionBoundary

A component that handles Redirection exceptions.
The `RedirectionBoundary` component captures any `Redirection` exceptions thrown by its children and facilitates redirection to specific routes.

By utilizing the `RedirectionBoundary` component, you can manage redirection logic declaratively within the component tree, allowing for seamless navigation between different parts of your application based on URL paths.

## Example

```jsx
const Example = () => {
  if (!isLoggedIn) {
    throw Redirection.of({ destination: 'login' });
  }
  return <></>;
};

export const Component = () => {
  return (
    <RedirectionBoundary
      onRedirect={redirection => {
        window.location.href = redirection.options.destination;
      }}
    >
      <Example />
    </RedirectionBoundary>
  );
};
```
