---
title: useOverlay
---

`useOverlay` is a utility hook to handle overlays in a declarative manner.

- What is an overlay? It is a component like BottomSheet and Dialog, which is mounted on a separate UI layer.
- In order to use it, you need to add `<OverlayProvider />` to the root component.
- You can make several overlays by calling useOverlay multiple times.
- You can use it with `Promise`.

```ts
type CreateOverlayElement = (props: {
  // When open() is called, isOpen is set to true. Use this value to manage whether overlay is open.
  isOpen: boolean;
  // When close() is called, isOpen is set to false. Pass this to `onClose` callback of the overlay component.
  close: () => void;
  // When this function is called, the overlay is unmounted.
  // The reason why we have both close and exit is that when overlay has some kind of fade-out animations,
  // we need for the fade-out animation to complete before unmounting the component.
  exit: () => void;
}) => JSX.Element;

function useOverlay(options?: {
  // When the component which invokes `useOverlay` is unmounted,
  // the overlay is unmounted accordingly.
  // Set exitOnUnmount to false by disabling this behavior.
  // If you forget to run the exit function, the overlay remains in the web service indefinitely.
  // If you have set exitOnUnmount to false, you should not forget to call the exit function.
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

// After ConfirmDialog's confirmButton is pressed, or onClose is called
console.log('dialog closed');
```
