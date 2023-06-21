## useActionObserver

useActionObserver hook은 반환하는 "ref"를 특정 Element에 연결하여, 해당 Element가 Intersection Observer 구독하면서, "Viewport"에 "threshold"만큼 노출되면 "onAction" 함수를 호출하는 hook입니다.

useActionObserver hook은 "IntersectionObserver"의 기본적인 옵션(threshold, rootMargin, root)을 옵셔널하게 받아오며, repetitionCount를 활용하여 onAction을 얼마나 반복 호출할 것인지를 지정할 수 있습니다.

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
    onAction: () => console.log('Viewport에 해당 컴포넌트가 0.3(30%)만큼 노출되면 onAction 함수가 실행되요.'),
    threshold: 0.3,
  });
  const box2Ref = useActionObserver({
    onAction: () => console.log('onAction 함수가 3회 호출되면, box2를 unobserve해요.'),
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
