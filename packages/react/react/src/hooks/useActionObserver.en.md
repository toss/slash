## useActionObserver

The useActionObserver hook returns a "ref" that can be connected to a specific element. When the element subscribes to the Intersection Observer and is exposed to the "Viewport" by a certain "threshold", the hook calls the "onAction" function.

The useActionObserver hook optionally takes in the basic options for "IntersectionObserver" (threshold, rootMargin, root), and you can use repetitionCount to specify how many times you want to call onAction.

```ts
interface UseActionObserverProps {
  onAction: () => void;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  repetitionCount?: number;
}

function useActionObserver<E extends HTMLElement = HTMLElement>({
  onAction,
  threshold,
  rootMargin,
  repetitionCount,
  root = null,
}: UseActionObserverProps): EffectRef<E>;
```

## Example

```jsx
const Example = () => {
  const box1Ref = useActionObserver({
    onAction: () => {
      console.log('The onAction function is executed when the component is exposed in the Viewport by 0.3 (30%)');
    },
    threshold: 0.3,
  });
  const box2Ref = useActionObserver({
    onAction: () => console.log('After the onAction function is called 3 times, unobserve box2'),
    repetitionCount: 3,
  });
  const box3Ref = useActionObserver({ onAction: () => console.log('Default Example') });

  return (
    <div>
      <Box ref={box1Ref}>Example Box1</Box>
      <Box ref={box2Ref}>Example Box2</Box>
      <Box ref={box3Ref}>Example Box3</Box>
    </div>
  );
};
```
