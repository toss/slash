# useRefEffect

- See: https://github.com/facebook/react/issues/15176 - `ref`의 cleanup을 구현해달라고 요청하는 GitHub Issue

`useRef`에 저장되는 값에 안전하게 이펙트를 발생시키고자 할 때 사용할 수 있는 hook입니다.

```typescript
const ref = useRefEffect<HTMLElement>(
  element => {
    // ref가 주어진 element가 mount됐을 때 실행할 Effect

    return () => {
      // ref가 주어진 element가 unmount됐을 때 실행할 Cleanup
    };
  },
  [...deps]
);
```

- `ref.current` 프로퍼티 접근이나 null 체크와 같이 불필요한 코드를 줄일 수 있습니다.
- `ref`를 제공한 컴포넌트가 언마운트되었을 때 실행될 cleanup 함수를 안전하게 등록할 수 있습니다.

- `ref`가 주어지는 값이 마운트되거나, `deps` 가 변경되면 이펙트가 실행됩니다.
  - 안전하게 `useRefEffect` 를 사용하기 위해서 [exhaustive-deps ESLint 규칙](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration)에 `useRefEffect`를 검사 대상으로 추가하시기 바랍니다.
- `useEffect`와 동일하게 `cleanup` 함수를 반환할 수 있습니다.

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
