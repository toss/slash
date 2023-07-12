# Portal

Portal 컴포넌트는 `React.createPortal`을 사용해 부모 컴포넌트의 DOM 계층 구조 외부의 DOM 노드에서 자식 컴포넌트를 렌더링합니다.

Portal 컴포넌트는 기본적으로 `document.body`에 Portal 노드를 렌더링합니다. 하지만 Portal 컴포넌트의 `containerRef` 프로퍼티를 전달하면 Portal 노드를 `document.body`가 아닌 `다른 DOM 노드`에서 렌더링할 수 있습니다.

또한, `중첩 포털 기능`을 지원합니다. 여러 Portal 컴포넌트를 중첩하면 `중첩된 Portal DOM 계층 구조`가 생성됩니다.

Portal 컴포넌트는 `Modal`, `Dialog`, `Tooltip`과 같은 기능과 함께 사용하기에 이상적입니다.

[React CreatePortal](https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal) 다음 문서를 참고해주세요.

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
