# Portal

The Portal component uses `React.createPortal` to render the child component on a DOM node outside of the parent component's DOM hierarchy.

At this time, The Portal component finds the external DOM node through the `id` value passed in as props.

If it finds an external DOM node with that `id` value, it will render the child component on that external DOM node, otherwise it will render the child component on the parent component.

The Portal component is ideal for use with features like `Modal`, `Dialog`, and `Tooltip`.

[React CreatePortal](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal) Please refer to the following articles

<br />

```tsx
function Portal({ id, children }: { children: React.ReactNode; id: string }): JSX.Element;
```

## Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="root"></div>
    <!-- Add Outer DOM Node (Required: id) -->
    <div id="portal"></div>
  </body>
</html>
```

```jsx
const Example = () => {
  return (
    <Portal id="portal">
      <div>Example Portal</div>
    </Portal>
  );
};
```
