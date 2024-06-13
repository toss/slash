# useRefEffect

- See: https://github.com/facebook/react/issues/15176 - GitHub Issue requesting implementation of `ref` cleanup

This hook can be used when you want to safely effect the value stored in `useRef`.

```typescript
const ref = useRefEffect<HTMLElement>(
  element => {
    // Effect to run when the element given by ref is mounted

    return () => {
      // Cleanup to run when the element given by ref is unmounted
    };
  },
  [...deps]
);
```

- Reduce unnecessary code, such as accessing the `ref.current` property or null checks.
- You can safely register a cleanup function to run when the component that provided the `ref` is unmounted.

- If the value given by `ref` is mounted, or if `deps` changes, the effect will be executed.
  - To safely use `useRefEffect`, add `useRefEffect` as a check in the [exhaustive-deps ESLint rule](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration).
- It can return the same `cleanup` function as `useEffect`.

## Example 1

```jsx
const ref = useRefEffect((section: HTMLDivElement) => {
  safeSmoothScrollTo(window, { top: getScrollY(section) });
}, []);

<div ref={ref} />;
```

## Example 2

```jsx
const ref = useRefEffect((div: HTMLDivElement) => {
  const handler = () => {};

  div.addEventListener('someevent', handler);

  return () => {
    div.removeEventListener('someevent', handler);
  };
}, []);

<div ref={ref} />;
```

## Example 3

```jsx
const ref = useRefEffect(
  (div: HTMLDivElement) => {
    if (someCondition) {
      const handler = () => {};

      div.addEventListener('click', handler);

      return () => {
        return div.removeEventListener('click', handler);
      };
    }
  },
  [someCondition]
);

<div ref={ref}>...</div>;
```
