---
title: ImpressionArea
---

# ImpressionArea

A component that fires an event when it appears or disappears in the browser viewport.
It uses the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API to work efficiently.

ImpressionArea renders an additional div. (If you don't need a div, use the `useImpressionRef` Hook).

```jsx
<ImpressionArea
  // callback called when the element enters the browser viewport
  onImpressionStart={() => {}}
  // callback called when the element exits the browser viewport
  onImpressionEnd={() => {}}
  // You can specify an element to use instead of the Viewport to examine the visibility of the target element.
  // @default null
  root={root}
  // Specify how much margin to give compared to what the actual element occupies (`string`)
  // See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).
  rootMargin={rootMargin}
  // Specifies what percentage of the time the entry was visible, a number from 0 to 1. (`number`)
  // @default 0
  areaThreshold={areaThreshold}
  // Specifies whether to call the impression event when the screen is entered for more than a few milliseconds, in ms. (`number`)
  // @default 0
  timeThreshold={timeThreshold}
>
  Call onImpressionStart when you see me
</ImpressionArea>
```

## Examples

```jsx
<ImpressionArea onImpressionStart={() => logger.log('Hello')}>
  <div>Hello</div>
</ImpressionArea>
```

## Tests

You can test it using `@toss/impression-area/testing`.

```tsx
import { mockImpression } from '@toss/impression-area/testing';

describe('ImpressionArea', () => {
  it('When visible to the user, onImpressionStart is called; when hidden, onImpressionEnd is called', async () => {
    const onImpressionStart = jest.fn();
    const onImpressionEnd = jest.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd} onImpressionStart={onImpressionStart}>
        Hello
      </ImpressionArea>
    );

    const div = screen.getByText('Hello');

    mockImpression.view(div);

    await waitFor(() => {
      expect(onImpressionStart).toBeCalledTimes(1);
    });
  });
});
```
