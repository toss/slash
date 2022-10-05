import { render } from '@testing-library/react';
import SSRSuspense from './SSRSuspense';

function FallbackComponent() {
  return <div>fallback</div>;
}

function InnerComponent() {
  return <div>inner</div>;
}

describe('SSRSuspense', () => {
  it('비동기 처리가 없는 경우에는 InnerComponent를 그대로 렌더링한다.', async () => {
    const { findByText } = await render(
      <SSRSuspense fallback={<FallbackComponent />}>
        <InnerComponent />
      </SSRSuspense>
    );

    expect(await findByText('inner')).not.toBeNull();
  });

  it('transition 애니메이션이 있는 경우에는 children의 opacity를 0으로 먼저 렌더한다 ', async () => {
    const { findByText } = await render(
      <SSRSuspense fallback={<FallbackComponent />} transition={true}>
        <InnerComponent />
      </SSRSuspense>
    );
    const inner = await findByText('inner');
    expect(inner.parentNode).toHaveStyle({ opacity: 0 });
  });
});
