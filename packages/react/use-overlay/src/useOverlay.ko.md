---
title: useOverlay
---

`useOverlay`는 Overlay를 선언적으로 다루기 위한 유틸리티입니다.

- Overlay란? BottomSheet과 Dialog처럼 별도의 UI 레이어에 띄우는 컴포넌트
- 사용하기 위해선 \_app.tsx에 `<OverlayProvider />`를 추가해야 합니다.
- useOverlay를 여러 번 호출해서 여러 개의 Overlay를 만들 수 있습니다.
- Promise와 함께 사용할 수 있습니다.

```ts
type CreateOverlayElement = (props: {
  // open()을 호출했을 때 isOpen이 true로 바뀝니다. 이 값을 이용해서 Overlay에 띄울 컴포넌트의 open 상태를 관리합니다.
  isOpen: boolean;
  // 이 함수가 호출되면 isOpen이 false로 바뀝니다. 주로 Overlay로 띄울 컴포넌트의 onClose 함수에 이 함수를 주입합니다.
  close: () => void;
  // 이 함수가 호출되면 해당 Overlay가 unmount됩니다.
  // close와 exit이 분리되어 있는 이유는 Overlay를 닫으면서 fade-out 애니메이션을 주고 싶을 때 close와 동시에 unmount시켜버리면 애니메이션이 먹히기때문입니다.
  exit: () => void;
}) => JSX.Element;

function useOverlay(options?: {
  // useOverlay를 호출한 컴포넌트가 unmount 되면 overlay도 같이 unmount(=exit) 됩니다.
  // exitOnUnmount의 값을 false로 설정하였다면 useOverlay를 호출한 컴포넌트가 unmount 되도 overlay가 같이 unmount 되지 않습니다.
  // 따라서 원하는 타이밍에 overlay의 exit 함수를 직접 실행하여 overlay를 unmount 시킬 수 있습니다. exit 함수를 실행시키지 않는다면
  // 등록된 overlay가 메모리 상에 계속 남아있게 됩니다. exitOnUnmount의 값을 false로 설정하였다면 반드시 exit 함수를 실행시켜주세요.
  // default: true
  exitOnUnmount?: boolean;
}): {
  open: (overlayElement: CreateOverlayElement) => void;
  close: () => void;
};
```

```tsx
// _app.tsx
import { OverlayProvider } from '@toss/use-overlay';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OverlayProvider>
      <Component {...pageProps} />
    </OverlayProvider>
  );
}

// Page.tsx
import { useOverlay } from '@toss/use-overlay';

const overlay = useOverlay();
const openFooConfirmDialog = () => {
  return new Promise<boolean>(resolve => {
    overlay.open(({ isOpen, close }) => (
      <FooConfirmDialog
        open={isOpen}
        onClose={() => {
          resolve(false);
          close();
        }}
        onConfirm={() => {
          resolve(true);
          close();
        }}
      />
    ));
  });
};

await openFooConfirmDialog();

// ConfirmDialog의 confirmButton을 누르거나 onClose가 호출된 후
console.log('dialog closed');
```
