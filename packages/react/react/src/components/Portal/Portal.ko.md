# Portal

Portal Component를 사용하여 부모 컴포넌트의 DOM 계층 구조 외부의 DOM 노드에 자식을 렌더링합니다.

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
