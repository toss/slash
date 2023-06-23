# useImageLazyLoading

`ref` 가 주어진 요소가 브라우저 Viewport(또는 root로 지정한 요소)에 보여질 때 이미지를 Lazy Load하는 훅입니다.
[IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.

## Example

```jsx
const Example = () => {
  const imgRef = useImageLazyLoading({
    // 타겟 요소가 Viewport(또는 root로 지정한 요소) 진입 시 호출되는 callback
    onAction: () => {},

    // 타겟 요소의 가시성을 검사하기 위해 Viewport 대신 사용할 요소를 지정할 수 있습니다.
    root,

    // Margin을 이용해 root 요소의 범위를 확장하거나 축소할 수 있습니다. (string)
    // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) 을 참고하세요.
    rootMargin,

    // Observer가 실행되기 위해 요소의 가시성이 얼마나 필요한지 백분율로 표시합니다. (number[] | number)
    // 0.3의 경우 가시성 30%를 의미합니다.
    threshold,
  });

  return (
    <img ref={imgRef} data-src={imgSrc}>
  );
};
```
