---
title: ImpressionArea
---

# ImpressionArea

브라우저 뷰포트에 보여지거나 사라지는 시점에 이벤트를 발생시키는 컴포넌트입니다.
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.

ImpressionArea는 추가적인 div를 render합니다. (div가 없어야 하는 경우 `useImpressionRef` Hook을 사용하세요.)

```jsx
<ImpressionArea
  // 요소가 브라우저 뷰포트 진입시 호출되는 callback
  onImpressionStart={() => {}}
  // 요소가 브라우저 뷰포트에서 나왔을 때 호출되는 callback
  onImpressionEnd={() => {}}
  // 타겟 요소의 가시성을 검사하기 위해 Viewport 대신 사용할 요소를 지정할 수 있습니다.
  // @default null
  root={root}
  // 실제 요소가 차지하는 것 대비 얼마나 margin을 줄 것인지 지정 (`string`)
  // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) 을 참고하세요.
  rootMargin={rootMargin}
  // 몇 퍼센트 이상 보여졌을 때 진입한 것인지 지정, 0~1까지의 숫자. (`number`)
  // @default 0
  areaThreshold={areaThreshold}
  // 몇 밀리세컨드 이상 화면에 진입해 있을 때 impression 이벤트를 호출할지 지정, ms 단위. (`number`)
  // @default 0
  timeThreshold={timeThreshold}
>
  내가 보여지면 onImpressionStart를 호출해줘
</ImpressionArea>
```

## Examples

```jsx
<ImpressionArea onImpressionStart={() => logger.log('Hello')}>
  <div>Hello</div>
</ImpressionArea>
```

## Tests

`@toss/impression-area/testing`을 이용하여 테스트할 수 있습니다.

```tsx
import { mockImpression } from '@toss/impression-area/testing';

describe('ImpressionArea', () => {
  it('사용자에게 보여지면 onImpressionStart가 호출되고, 가려지면 onImpressionEnd가 호출된다.', async () => {
    const onImpressionStart = jest.fn();
    const onImpressionEnd = jest.fn();

    render(
      <ImpressionArea onImpressionEnd={onImpressionEnd} onImpressionStart={onImpressionStart}>
        안녕하세요
      </ImpressionArea>
    );

    const div = screen.getByText('안녕하세요');

    mockImpression.view(div);

    await waitFor(() => {
      expect(onImpressionStart).toBeCalledTimes(1);
    });
  });
});
```
