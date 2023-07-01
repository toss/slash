# Portal

The Portal component uses `React.createPortal` to render the child component on a DOM node outside of the parent component's DOM hierarchy.

The Portal Component renders a Portal Node in `document.body` by default. However, if you pass in the Portal Component's `containerRef` prop, you can render the Portal Node in a `different DOM Node` than `document.body`.

Additionally, it supports `nested portal functionality`. Nesting multiple portal components creates `a nested portal DOM hierarchy`.

The Portal component is ideal for use with features like `Modal`, `Dialog`, and `Tooltip`.

[React CreatePortal](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal) Please refer to the following articles

<br />

```tsx
function Portal({
  children,
  containerRef,
}: {
  children: React.ReactNode;=
  containerRef?: React.RefObject<HTMLElement | null>;
}): JSX.Element;
```

<br />

## Default Example

```tsx
const Example = () => {
  return (
    <Portal>
      <p>Example Portal</p>
    </Portal>
  );
};
```

<br />

## Container Example

```tsx
const Example = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Portal containerRef={ref}>
        <p>Example Portal</p>
      </Portal>

      <div id="outer" ref={ref} />
    </>
  );
};
```

<br />

## Nested Example

```tsx
const Example = () => {
  return (
    <Portal>
      <p>Default Portal</p>
      <Portal>
        <p>Nested Portal1</p>
        <Portal>
          <p>Nested Portal2</p>
        </Portal>
      </Portal>
    </Portal>
  );
};
```
