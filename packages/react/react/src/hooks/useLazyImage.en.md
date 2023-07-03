# useLazyImage

A hook that loads an image when the image tag given by `ref` is visible in the browser viewport (or the element specified by root).

Given as a return value, `isLoading` allows you to verify that the image has finished loading.

By applying Image Lazy Load, users no longer need to load all image resources at once when entering the page, improving their user experience.

It uses the [IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API to work efficiently.

<br />

```tsx
function useLazyImage({
  src,
  rootMargin,
  threshold,
  root,
  onLoadComplete,
  onInView,
}: {
  src: string;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  onLoadComplete?: () => void;
  onInView?: () => void;
}): {
  readonly ref: React.RefObject<HTMLImageElement>;
  readonly isLoading: boolean;
};
```

## Example

```tsx
const Example = () => {
  const { ref: imgRef, isLoading } = useLazyImage({
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
    onInView,

    /**
     * A callback function that is called when the image has finished loading.
     * type: () => void
     * optional
     */
    onLoadComplete,

    /**
     * You can specify an element to use instead of the Viewport to examine the visibility of the target element.
     * type: Document | Element | null
     * optional
     */
    root,

    /**
     * Margin can be used to expand or contract the scope of the root element.
     * This value only works if you specify the root element; it doesn't work if root is null.
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
    <div>
      {isLoading && <div>image is being loading...</div>}
      <img
        ref={imgRef}
        width={400}
        height={400}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.2s' }}
      />
    </div>
  );
};
```
