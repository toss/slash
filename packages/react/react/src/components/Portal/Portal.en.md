# Portal

The Portal Component uses `React.createPortal` to render the Child Component on a DOM Element outside of the Parent Component's DOM hierarchy.

The Portal Component renders a Child Component in `document.body` by default. However, if you pass in the Portal Component's `containerRef` prop, you can render the Child Component in a `different DOM Element` than `document.body`.

Additionally, it supports `nested portal functionality`. Nesting multiple Portal Components creates `a nested portal DOM hierarchy`.

The Portal Component is ideal for use with features like `Modal`, `Dialog`, and `Tooltip`.

[React CreatePortal](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal) Please refer to the following articles

<br />

```tsx
function Portal({
  children,
  containerRef,
}: {
  children: React.ReactNode;
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
    <div>
      <Portal containerRef={ref}>
        <p>Example Portal</p>
      </Portal>

      <div id="outer" ref={ref} />
    </div>
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
