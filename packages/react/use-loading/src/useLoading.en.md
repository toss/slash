---
title: useLoading
---

# useLoading

Hooks that make it easy to manage the loading state of a Promise.

`useLoading` returns a Tuple of `[isLoading: boolean, startLoading: (promise: Promise) => Promise]`.

- The first value, `isLoading`, initially starts with `false`.
- The second value, `startLoading`, is a function that returns a `promise`.
  - When `startLoading` is executed and the promise given as an argument is resolved, `isLoading` becomes `true`.
  - If that Promise then resolves, `isLoading` becomes `false` again.

See the example below to see exactly how to use `useLoading`.

```typescript
const [isLoading, startLoading] = useLoading();
```

## Examples

```jsx
function postConfirmation(data: Data): Promise<Result> {
  return post.e2e<Result>('/api/sample/confirm', data);
}

function ConfirmButton({ data }: { data: Data }) {
  const [loading, startTransition] = useLoading();

  const handleSubmit = useCallback(async () => {
    const result = await startTransition(postConfirmation(data));
    router.push(`/success?id=${result.id}`);
  }, [call]);

  return (
    <Button loading={loading} onClick={handleSubmit}>
      GoGo
    </Button>
  );
}
```
