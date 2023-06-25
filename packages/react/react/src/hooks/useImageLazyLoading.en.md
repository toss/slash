# useImageLazyLoading

A hook that loads an image when the element given by `ref` is visible in the browser viewport (or the element you specify as root).

By applying Image Lazy Load, users no longer need to load all image resources at once when entering the page, improving their user experience.

It uses the [IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API to work efficiently.

<br />

```tsx
function useImageLazyLoading<Element extends HTMLImageElement>({
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
    /**
     * URL value of the image source to lazy load
     * type: string
     * required
     */
    src: 'image URL src'

    /**
     * A callback function that is called when the target element is exposed to the viewport (or the element specified as the root).
     * type: () => void
     * optional
     */
    onAction,

    /**
     * You can specify an element to use instead of the Viewport to examine the visibility of the target element.
     * type: Document | Element | null
     * optional
     */
    root,

    /**
     * Margin can be used to expand or contract the scope of the root element.
     * type: string
     * optional
     */
    rootMargin,

    /**
     * Shows how much visibility the element needs, as a percentage, for the observer to run.
     * type: number[] | number
     * optional
     */
    threshold,
  });

  return (
    <img ref={imgRef} alt="이미지1">
  );
};
```
