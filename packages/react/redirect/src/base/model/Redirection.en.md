---
title: Redirection
---

# Redirection

The protocol that defines redirection.

It comes with a RedirectionErrorBoundary, isRedirection type guard, and more.

In React, we use RedirectionBoundary to make it easier to use.

```ts
throw Redirection.of({ destination: '/issue/introduction/under-fourteen' });
```

## Examples

```ts
function fetchU18User() {
  const { type } = fetchUser();

  if (type >= 19) {
    // catch this in getInitialProps or etc
    throw Redirection.of({ destination: '/introduction/adult' });
  }

  return user;
}
```
