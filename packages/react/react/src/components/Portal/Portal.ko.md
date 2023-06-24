# Portal

`React.createPortal`를 사용하여 부모 컴포넌트의 DOM 계층 구조 외부의 DOM 노드에 자식을 렌더링합니다.
해당 컴포넌트는 Modal, Dialog, Tooltip과 같은 기능과 함께 사용하기에 적합합니다.

[React CreatePortal](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal) 다음 문서를 참고해주세요.

## Example

```html
<!DOCTYPE html>
<html lang="ko">
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
