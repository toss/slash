import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createFunnelStateId, useFunnelState } from './useFunnelState';

jest.mock('next/router', () => require('next-router-mock'));

// const 퍼널스텝리스트 = ['test1', 'test2'] as const;

const queryClient = new QueryClient();

describe('useFunnelState', () => {
  it('sessionStorage에 값이 있으면, 그 값이 상태의 초기값이 된다.', async () => {
    const persistedValue = {
      count: 25,
    };

    mockRouter.setCurrentUrl(`?funnel-step=test1`);
    sessionStorage.setItem(createFunnelStateId(''), JSON.stringify(persistedValue));

    function TestComponent() {
      const [state] = useFunnelState<{ count: number }>({ count: 0 });
      return <>{state.count}</>;
    }

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <TestComponent />
        </Suspense>
      </QueryClientProvider>
    );

    expect(await screen.findByText(persistedValue.count)).toBeInTheDocument();
  });

  it('setState를 하면 상태가 업데이트되어 리렌더링이 발생하고, sessionStorage에 있는 값도 업데이트된다.', async () => {
    mockRouter.setCurrentUrl(`?funnel-step=test1`);

    const updatedValue = {
      count: 22,
    };
    const buttonLabel = `update to ${updatedValue.count}`;

    function TestComponent() {
      const [state, setState] = useFunnelState<{ count: number }>({ count: 0 });
      return (
        <>
          {state.count}
          <button onClick={() => setState(updatedValue)}>{buttonLabel}</button>
        </>
      );
    }

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <TestComponent />
        </Suspense>
      </QueryClientProvider>
    );

    const updateButton = await screen.findByRole('button', { name: buttonLabel });
    await userEvent.click(updateButton);

    expect(await screen.findByText('22')).toBeInTheDocument();
    expect(sessionStorage.getItem(createFunnelStateId(''))).toBe(JSON.stringify(updatedValue));
  });

  it('clearState를 하면 상태가 다 초기화되고, sessionStorage에 있는 값도 초기화된다.', async () => {
    mockRouter.setCurrentUrl(`?funnel-step=test1`);

    const buttonLabel = `clear`;

    function TestComponent() {
      const [state, , clearState] = useFunnelState<{ count: number }>({ count: 0 });
      return (
        <>
          {state.count ?? 'cleared'}
          <button onClick={clearState}>{buttonLabel}</button>
        </>
      );
    }

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <TestComponent />
        </Suspense>
      </QueryClientProvider>
    );

    const updateButton = await screen.findByRole('button', { name: buttonLabel });
    await userEvent.click(updateButton);

    expect(await screen.findByText('cleared')).toBeInTheDocument();
    expect(sessionStorage.getItem(createFunnelStateId(''))).toBeNull();
  });
});
