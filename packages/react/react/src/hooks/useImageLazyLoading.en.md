# useImageLazyLoading

A hook that loads an image when the element given by `ref` is visible in the browser viewport (or the element you specify as root).

By applying Image Lazy Load, users no longer need to load all image resources at once when entering the page, improving their user experience.

It uses the [IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API to work efficiently.

<br />

```tsx
function useImageLazyLoading<Element extends HTMLElement>({
  src,
  rootMargin,
  threshold,
  root,
  onAction,
}: {
  src: string;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  onAction?: () => void;
}): EffectRef<Element>;
```

## Example

```tsx
const Example = () => {
  const imgRef = useImageLazyLoading({
    // URL value of the image source to lazy load
    src: 'image src'

    // Callback called when the target element enters the Viewport (or the element specified as root)
    onAction: () => {},

    // You can specify an element to use instead of the Viewport to examine the visibility of the target element.
    root,

    // Margin can be used to expand or contract the scope of the root element. (string)
    // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) 을 참고하세요.
    rootMargin,

    // Shows how much visibility the element needs, as a percentage, for the observer to run. (number[] | number)
    // A value of 0.3 means 30% visibility.
    threshold,
  });

  return (
    <img ref={imgRef} alt="이미지1">
  );
};
```
