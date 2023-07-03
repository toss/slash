# useLazyImage

`ref` 가 주어진 이미지 태그가 브라우저 Viewport(또는 root로 지정한 요소)에 보여질 때 이미지를 로드하는 훅입니다.

반환 값으로 주어지는 `isLoading`를 통해 이미지의 로드가 완료되었는지 확인할 수 있습니다.

이미지 Lazy Load를 적용함으로써, 사용자는 페이지 진입 시에 한번에 모든 이미지 리소스를 로드할 필요가 없어져 사용자 경험을 향상시킵니다.

[IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.

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
     * lazy load할 이미지 소스의 URL 값입니다.
     * type: string
     * required
     */
    src: 'Image URL src'

    /**
     * 타겟 요소가 Viewport(또는 root로 지정한 요소) 노출 될 때 호출되는 콜백 함수입니다.
     * type: () => void
     * optional
     */
    onInView,

    /**
     * 이미지가 로드가 완료되면 호출되는 콜백 함수입니다.
     * type: () => void
     * optional
     */
    onLoadComplete,

    /**
     * 타겟 요소의 가시성을 검사하기 위해 Viewport 대신 사용할 요소를 지정할 수 있습니다.
     * type: Document | Element | null
     * optional
     */
    root,

    /**
     * Margin을 이용해 root 요소의 범위를 확장하거나 축소할 수 있습니다.
     * 해당 값은 root 요소를 특정해야만 정상 동작합니다. root가 null일 경우에는 작동하지 않습니다.
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
