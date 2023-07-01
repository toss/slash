# Portal

Portal 컴포넌트는 `React.createPortal`를 사용하여 부모 컴포넌트의 DOM 계층 구조 외부의 DOM 노드에 자식 컴포넌트를 렌더링합니다.

이때, Portal 컴포넌트는 props로 넘겨받은 `id` 값을 통해 외부 DOM 노드를 찾습니다.

해당 id 값을 이용해 외부 DOM 노드를 찾는다면 해당 외부 DOM 노드에 자식 컴포넌트를 렌더링하고, 찾지 못한다면 부모 컴포넌트에 자식 컴포넌트를 렌더링합니다.

Portal 컴포넌트는 `Modal`, `Dialog`, `Tooltip`과 같은 기능과 함께 사용하기에 적합합니다.

[React CreatePortal](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal) 다음 문서를 참고해주세요.

<br />

```tsx
function Portal({ id, children }: { children: React.ReactNode; id: string }): JSX.Element;
```

## Example

```html
<!DOCTYPE html>
<html lang="ko">
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
