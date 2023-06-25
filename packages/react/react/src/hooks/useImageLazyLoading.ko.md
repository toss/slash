# useImageLazyLoading

`ref` 가 주어진 요소가 브라우저 Viewport(또는 root로 지정한 요소)에 보여질 때 이미지를 로드하는 훅입니다.

이미지 Lazy Load를 적용함으로써, 사용자는 페이지 진입 시에 한번에 모든 이미지 리소스를 로드할 필요가 없어져 사용자 경험을 향상시킵니다.

[IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.

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

```jsx
const Example = () => {
  const imgRef = useImageLazyLoading({
    /**
     * lazy load할 이미지 소스의 URL 값입니다.
     * type: string
     * required
     */
    src: 'image URL src'

    /**
     * 타겟 요소가 Viewport(또는 root로 지정한 요소) 노출 될 때 호출되는 callback Function입니다.
     * type: () => void
     * optional
     */
    onAction,

    /**
     * 타겟 요소의 가시성을 검사하기 위해 Viewport 대신 사용할 요소를 지정할 수 있습니다.
     * type: Document | Element | null
     * optional
     */
    root,

    /**
     * Margin을 이용해 root 요소의 범위를 확장하거나 축소할 수 있습니다.
     * type: string
     * optional
     */
    rootMargin,

    /**
     * Observer가 실행되기 위해 요소의 가시성이 얼마나 필요한지 백분율로 표시합니다.
     * type: number[] | number
     * optional
     */
    threshold,
  });

  return (
    <img ref={imgRef} alt="image1">
  );
};
```
