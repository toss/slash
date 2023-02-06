import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, selector, useRecoilValue } from 'recoil';
import { clearRecoilCache } from '.';

describe('clearRecoilCache', () => {
  it('정상적으로 Recoil Cache를 cleanup 한다.', async () => {
    const myFetcher = jest.fn();

    const mySelector = selector({
      key: 'mySelector',
      get: async () => myFetcher(),
    });

    function TestComponent() {
      const value = useRecoilValue(mySelector);

      return <div>{value}</div>;
    }

    myFetcher.mockResolvedValueOnce(1);

    const { unmount } = renderWithRecoilRoot(<TestComponent />);
    expect(await screen.findByText('1')).toBeInTheDocument();
    unmount();

    clearRecoilCache();

    myFetcher.mockResolvedValueOnce(2);
    renderWithRecoilRoot(<TestComponent />);
    expect(await screen.findByText('2')).toBeInTheDocument();
  });
});

const renderWithRecoilRoot: typeof render = ((ui: any, options: any) => {
  return render(ui, {
    ...options,
    wrapper: ({ children }) => {
      return (
        <RecoilRoot>
          <Suspense fallback={null}>{children}</Suspense>
        </RecoilRoot>
      );
    },
  });
}) as any;
