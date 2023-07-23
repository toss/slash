---
title: useImpressionRef
---

# useImpressionRef

Hook that fires an event when the element given by `ref` appears or disappears in the browser viewport.
It works efficiently by using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.

To use it as a component, use `ImpressionArea`.

```tsx
const ref = useImpressionRef({
  // callback called when the element enters the browser viewport
  onImpressionStart: () => {},

  // callback called when the element exits the browser viewport
  onImpressionEnd: () => {},

  // You can specify an element to use instead of the Viewport to examine the visibility of the target element.
  // @default null
  root={root}

  // Specify how much margin to give compared to what the actual element occupies (`string`)
  // See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).
  rootMargin,

  // Specifies what percentage of the time the entry was visible, a number from 0 to 1. (`number`)
  // @default 0
  areaThreshold,

  // Specifies whether to call the impression event when the screen is entered for more than a few milliseconds, in ms. (`number`)
  // @default 0
  timeThreshold,
});

<div ref={ref}>Call onImpressionStart when you see me</div>;
```
