import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { ReactNode, Suspense } from 'react';
import ReactDOMServer from 'react-dom/server';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useFunnel } from './useFunnel';
import { RouterProvider } from './RouterContext';

const 퍼널스텝리스트 = ['test1', 'test2'] as const;
const queryClient = new QueryClient();

function renderWithTestAppContext(node: ReactNode) {
  return render(
    <RouterProvider router={mockRouter}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>{node}</Suspense>
      </QueryClientProvider>
    </RouterProvider>
  );
}

describe('useFunnel이 정상적으로 동작하는 테스트', () => {
  it('Query Param의 funnel-step이 test1일 때, test1 스텝이 렌더된다.', async () => {
    function TestComponent() {
      const [테스트퍼널] = useFunnel(퍼널스텝리스트);

      return (
        <테스트퍼널>
          <테스트퍼널.Step name="test1">
            <h1>Test1</h1>
          </테스트퍼널.Step>
        </테스트퍼널>
      );
    }

    mockRouter.setCurrentUrl(`?funnel-step=test1`);
    renderWithTestAppContext(<TestComponent />);

    expect(mockRouter.query['funnel-step']).toBe('test1');
    expect(await screen.findByText('Test1')).toBeInTheDocument();
  });

  it('test1에서 setStep을 클릭하여 test2 스텝으로 넘어간다.', async () => {
    function TestComponent() {
      const [테스트퍼널, setStep] = useFunnel(퍼널스텝리스트);

      return (
        <테스트퍼널>
          <테스트퍼널.Step name="test1">
            <h1>Test1</h1>
            <button onClick={() => setStep('test2')}>next</button>
          </테스트퍼널.Step>
          <테스트퍼널.Step name="test2">
            <h1>Test2</h1>
          </테스트퍼널.Step>
        </테스트퍼널>
      );
    }

    mockRouter.setCurrentUrl(`?funnel-step=test1`);
    renderWithTestAppContext(<TestComponent />);

    const button = await screen.findByRole('button', { name: 'next' });
    await userEvent.click(button);

    expect(mockRouter.query['funnel-step']).toBe('test2');
    expect(await screen.findByText('Test2')).toBeInTheDocument();
  });

  it('test1에서 setStep을 클릭하여 test2 스텝으로 넘어갈 때, test2에 걸린 onEnter와 useFunnel에 걸어 놓은 onStepChange가 호출된다.', async () => {
    const handleStepChange = jest.fn((name: typeof 퍼널스텝리스트[number]) => {
      return name;
    });
    const handleTest2Enter = jest.fn();

    function TestComponent() {
      const [테스트퍼널, setStep] = useFunnel(퍼널스텝리스트, {
        onStepChange: handleStepChange,
      });

      return (
        <테스트퍼널>
          <테스트퍼널.Step name="test1">
            <h1>Test1</h1>
            <button onClick={() => setStep('test2')}>next</button>
          </테스트퍼널.Step>
          <테스트퍼널.Step name="test2" onEnter={handleTest2Enter}>
            <h1>Test2</h1>
          </테스트퍼널.Step>
        </테스트퍼널>
      );
    }

    mockRouter.setCurrentUrl(`?funnel-step=test1`);
    renderWithTestAppContext(<TestComponent />);

    const button = await screen.findByRole('button', { name: 'next' });
    await userEvent.click(button);

    await waitFor(() => expect(handleStepChange).toBeCalledWith('test2'));
    await waitFor(() => expect(handleTest2Enter).toBeCalled());
  });

  it("setStep('test2', { preserveQuery: true }) 시 funnel-step는 test2로, 그 외의 쿼리들은 유지된다.", async () => {
    function TestComponent() {
      const [테스트퍼널, setStep] = useFunnel(퍼널스텝리스트);

      return (
        <테스트퍼널>
          <테스트퍼널.Step name="test1">
            <h1>Test1</h1>
            <button onClick={() => setStep('test2', { preserveQuery: true })}>next</button>
          </테스트퍼널.Step>
          <테스트퍼널.Step name="test2">
            <h1>Test2</h1>
          </테스트퍼널.Step>
        </테스트퍼널>
      );
    }

    mockRouter.setCurrentUrl(`?funnel-step=test1&test=test&merong=merong`);
    renderWithTestAppContext(<TestComponent />);

    const button = await screen.findByRole('button', { name: 'next' });
    await userEvent.click(button);

    expect(mockRouter.query['funnel-step']).toBe('test2');
    expect(mockRouter.query['test']).toBe('test');
    expect(mockRouter.query['merong']).toBe('merong');
  });

  it('funnel-step 쿼리 파라미터가 없고 initialStep이 있을 경우, initialStep에 해당하는 스텝이 렌더된다.', async () => {
    function TestComponent() {
      const [테스트퍼널] = useFunnel(퍼널스텝리스트, { initialStep: 'test1' });

      return (
        <테스트퍼널>
          <테스트퍼널.Step name="test1">
            <h1>Test1</h1>
          </테스트퍼널.Step>
        </테스트퍼널>
      );
    }

    mockRouter.setCurrentUrl('');
    renderWithTestAppContext(<TestComponent />);

    // SSR에서 에러가 생기는지 여부 확인
    expect(() =>
      ReactDOMServer.renderToString(
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={null}>
            <TestComponent />
          </Suspense>
        </QueryClientProvider>
      )
    ).not.toThrow();
    expect(await screen.findByText('Test1')).toBeInTheDocument();
  });

  it('options에 stepQueryKey가 kkk이면, 현재 스텝을 나타내는 query key는 kkk이고 setStep 시 kkk가 변경된다.', async () => {
    const CUSTOM_QUERY_KEY = 'kkk';
    function TestComponent() {
      const [테스트퍼널, setStep] = useFunnel(퍼널스텝리스트, { initialStep: 'test1', stepQueryKey: CUSTOM_QUERY_KEY });

      return (
        <테스트퍼널>
          <테스트퍼널.Step name="test1">
            <h1>Test1</h1>
            <button onClick={() => setStep('test2')}>next</button>
          </테스트퍼널.Step>
          <테스트퍼널.Step name="test2">
            <h1>Test2</h1>
          </테스트퍼널.Step>
        </테스트퍼널>
      );
    }

    mockRouter.setCurrentUrl(`?${CUSTOM_QUERY_KEY}=test1`);
    renderWithTestAppContext(<TestComponent />);

    const button = await screen.findByRole('button', { name: 'next' });
    await userEvent.click(button);

    expect(mockRouter.query[CUSTOM_QUERY_KEY]).toBe('test2');
  });
});

describe('useFunnel.withState', () => {
  it('퍼널 스텝과 퍼널 상태를 동시에 갱신할 수 있다: 퍼널 스텝을 변경할 때 퍼널 상태 갱신이 완료될 때까지 지연할 수 있다', async () => {
    mockRouter.setCurrentUrl(`?funnel-step=시작`);

    function FunnelPage() {
      const [Funnel, state, setState] = useFunnel(['시작', '다음'] as const).withState<{ count?: number }>({});

      return (
        <Funnel>
          <Funnel.Step name="시작">
            <시작 on확인={() => setState({ step: '다음', count: 1 })} />
          </Funnel.Step>
          <Funnel.Step name="다음">
            <다음 requiredProp={state.count!} />
          </Funnel.Step>
        </Funnel>
      );
    }
    function 시작({ on확인 }: { on확인: () => void }) {
      return (
        <div>
          시작
          <button onClick={on확인}>확인</button>
        </div>
      );
    }
    function 다음({ requiredProp }: { requiredProp: number }) {
      return (
        <div>
          끝<span>{requiredProp}</span>
        </div>
      );
    }

    renderWithTestAppContext(<FunnelPage />);

    await userEvent.click(await screen.findByRole('button', { name: '확인' }));

    expect(await screen.findByText('1')).toBeInTheDocument();
  });
});
