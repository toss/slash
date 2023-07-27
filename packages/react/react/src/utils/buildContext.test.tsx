import { render, screen } from '@testing-library/react';
import { buildContext } from './buildContext';

const consoleMock = jest.spyOn(console, 'error');
consoleMock.mockImplementation(() => undefined);

describe('buildContext', () => {
  test('context를 정의하고 Provide/Consume 할 수 있다.', async () => {
    const [TitleProvider, useTitleContext] = buildContext<{ title: string }>('TitleContext');

    function Inner() {
      const context = useTitleContext();

      return <h1>{context.title}</h1>;
    }

    render(
      <TitleProvider title="타이틀">
        <Inner />
      </TitleProvider>
    );

    expect(await screen.findByText('타이틀')).toBeInTheDocument();
  });

  test('기본 값(defaultContextValues)을 Provide/Consume 할 수 있다.', async () => {
    const [TitleProvider, useTitleContext] = buildContext<{ title: string }>('TitleContext', {
      title: '기본 타이틀',
    });

    function Inner() {
      const context = useTitleContext();

      return <h1>{context.title}</h1>;
    }

    render(
      <TitleProvider>
        <Inner />
      </TitleProvider>
    );

    expect(await screen.findByText('기본 타이틀')).toBeInTheDocument();
  });

  test('ContextValues는 기본값을 덮어쓰고 이 값을 Provide/Consume 할 수 있다.', async () => {
    const [TitleProvider, useTitleContext] = buildContext<{ title: string }>('TitleContext', {
      title: '기본 타이틀',
    });

    function Inner() {
      const context = useTitleContext();

      return <h1>{context.title}</h1>;
    }

    render(
      <TitleProvider title="타이틀">
        <Inner />
      </TitleProvider>
    );

    expect(await screen.findByText('타이틀')).toBeInTheDocument();
  });

  test('TitleProvider를 감싸주지 않았을 때 consume하려고 하면 에러를 반환한다.', async () => {
    const [, useTitleContext] = buildContext<{ title: string }>('TitleContext');

    function Inner() {
      const context = useTitleContext();

      return <h1>{context.title}</h1>;
    }

    expect(() => render(<Inner />)).toThrow();
  });

  test('defaultContextValues와 ContextValue 둘다 없을 때 에러를 반환한다.', async () => {
    const [TitleProvider, useTitleContext] = buildContext<{ title: string }>('TitleContext');

    function Inner() {
      const context = useTitleContext();

      return <h1>{context.title}</h1>;
    }

    expect(() =>
      render(
        <TitleProvider>
          <Inner />
        </TitleProvider>
      )
    ).toThrow();
  });

  test('접근할 수 있는 값이 없을 때 에러를 반환한다.', async () => {
    const [TitleProvider, useTitleContext] = buildContext<{ title: string }>('TitleContext', null);

    function Inner() {
      const context = useTitleContext();

      return <h1>{context.title}</h1>;
    }

    expect(() =>
      render(
        <TitleProvider>
          <Inner />
        </TitleProvider>
      )
    ).toThrow();
  });
});
