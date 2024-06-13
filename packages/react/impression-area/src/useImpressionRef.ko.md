---
title: useImpressionRef
---

# useImpressionRef

`ref` 가 주어진 요소가 화면에 노출되거나 숨겨지는 시점에 이벤트를 발생시키는 Hook입니다.
"화면에 노출된다"는 문서가 포그라운드면서 뷰포트에 진입한 상태를 의미합니다.
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.

컴포넌트로 사용하려면 `ImpressionArea`를 사용하세요.

```tsx
const ref = useImpressionRef({
  // 요소가 브라우저 뷰포트 진입시 호출되는 callback
  onImpressionStart: () => {},

  // 요소가 브라우저 뷰포트에서 나왔을 때 호출되는 callback
  onImpressionEnd: () => {},

  // 타겟 요소의 가시성을 검사하기 위해 Viewport 대신 사용할 요소를 지정할 수 있습니다.
  // @default null
  root={root}

  // 실제 요소가 차지하는 것 대비 얼마나 margin을 줄 것인지 지정 (`string`)
  // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) 을 참고하세요.
  rootMargin,

  // 몇 퍼센트 이상 보여졌을 때 진입한 것인지 지정, 0~1까지의 숫자. (`number`)
  // @default 0
  areaThreshold,

  // 몇 밀리세컨드 이상 화면에 진입해 있을 때 impression 이벤트를 호출할지 지정, ms 단위. (`number`)
  // @default 0
  timeThreshold,
});

<div ref={ref}>내가 보여지면 onImpressionStart를 호출해줘</div>;
```
