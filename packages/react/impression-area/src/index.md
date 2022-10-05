# ImpressionArea, useImpressionRef

`ImpressionArea` 와 `useImpressionRef` 컴포넌트/Hook 을 이용하여 요소가 화면에 보이거나 숨겨지는 상황을 다룰 수 있습니다.

자세한 문서는 `ImpressionArea` / `useImpressionRef` 문서를 참고하세요.

## 테스트하기

`@tossteam/impression-area/testing`을 이용하여 테스트할 수 있습니다.

```tsx
import { mockImpression } from '@tossteam/impression-area/testing';

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