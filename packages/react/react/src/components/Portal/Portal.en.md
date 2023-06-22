# Portal

Render children to DOM nodes outside the parent component's DOM hierarchy using Portal Component.

## Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="root"></div>
    <!-- Add Outer DOM Node -->
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
