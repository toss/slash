import { render } from '@testing-library/react';
import withSSRSuspense from './withSSRSuspense';

function FallbackComponent() {
  return <div>fallback</div>;
}

function InnerComponent() {
  return <div>inner</div>;
}

describe('withSSRSuspense', () => {
  it('비동기 처리가 없는 경우에는 InnerComponent를 그대로 렌더링한다.', async () => {
    const WrappedComponent = withSSRSuspense(InnerComponent, { fallback: <FallbackComponent /> });
    const { findByText } = await render(<WrappedComponent />);

    expect(await findByText('inner')).not.toBeNull();
  });

  /** @see https://tossteam.slack.com/archives/C035TGD3KUG/p1652192741792159?thread_ts=1652188059.524649&cid=C035TGD3KUG */
  it('반환하는 컴포넌트는 name이 있다.', () => {
    const Component = withSSRSuspense(
      function MyComponent() {
        return null;
      },
      { fallback: null }
    );

    expect(Component.name).not.toEqual('');
  });
});
