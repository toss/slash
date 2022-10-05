import { render, renderHook } from '@testing-library/react';
import { ComponentProps, useRef } from 'react';

import { Stack } from './Stack';

const items = ['1', '2', '3'];

const DEFAULT_GUTTER = 24;

describe('<Stack />', () => {
  describe('<Stack direction="vertical" />', () => {
    function renderStack(props?: ComponentProps<typeof Stack.Vertical>) {
      return render(
        <Stack data-testid="stack" direction="vertical" {...props}>
          {items.map(item => {
            return (
              <div data-testid="stack-item" key={item}>
                {item}
              </div>
            );
          })}
        </Stack>
      );
    }

    it(`flex-direction: column이다.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: column');
    });

    it(`두 번째 노드부터 상단 여백 값을 가진다.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`상단 여백 값을 gutter prop으로 넘길 수 있다.`, () => {
      const gutter = 48;

      const { getAllByTestId } = renderStack({ gutter });

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${gutter}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${gutter}px`);
        }
      });
    });

    it(`ref를 받을 수 있어야 한다.`, () => {
      const {
        result: { current: ref },
      } = renderHook(() => useRef<HTMLDivElement>(null));

      renderStack({ ref });

      expect(ref.current).not.toBeNull();
    });
  });

  describe('<Stack.Vertical />', () => {
    function renderStack(props?: ComponentProps<typeof Stack.Vertical>) {
      return render(
        <Stack.Vertical data-testid="stack" {...props}>
          {items.map(item => {
            return (
              <div data-testid="stack-item" key={item}>
                {item}
              </div>
            );
          })}
        </Stack.Vertical>
      );
    }

    it(`flex-direction: column이다.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: column');
    });

    it(`두 번째 노드부터 상단 여백 값을 가진다.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`상단 여백 값을 gutter prop으로 넘길 수 있다.`, () => {
      const gutter = 48;

      const { getAllByTestId } = renderStack({ gutter });

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${gutter}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${gutter}px`);
        }
      });
    });

    it(`ref를 받을 수 있어야 한다.`, () => {
      const {
        result: { current: ref },
      } = renderHook(() => useRef<HTMLDivElement>(null));

      renderStack({ ref });

      expect(ref.current).not.toBeNull();
    });
  });

  describe('<Stack direction="horizontal" />', () => {
    function renderStack(props?: ComponentProps<typeof Stack.Horizontal>) {
      return render(
        <Stack direction="horizontal" data-testid="stack" {...props}>
          {items.map(item => {
            return (
              <div data-testid="stack-item" key={item}>
                {item}
              </div>
            );
          })}
        </Stack>
      );
    }

    it(`flex-direction: row이다.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: row');
    });

    it(`두 번째 노드부터 좌측 여백 값을 가진다.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`좌측 여백 값을 gutter prop으로 넘길 수 있다.`, () => {
      const gutter = 48;

      const { getAllByTestId } = renderStack({ gutter });

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${gutter}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${gutter}px`);
        }
      });
    });
  });

  describe('<Stack.Horizontal />', () => {
    function renderStack(props?: ComponentProps<typeof Stack.Horizontal>) {
      return render(
        <Stack.Horizontal data-testid="stack" {...props}>
          {items.map(item => {
            return (
              <div data-testid="stack-item" key={item}>
                {item}
              </div>
            );
          })}
        </Stack.Horizontal>
      );
    }

    it(`flex-direction: row이다.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: row');
    });

    it(`두 번째 노드부터 좌측 여백 값을 가진다.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`좌측 여백 값을 gutter prop으로 넘길 수 있다.`, () => {
      const gutter = 48;

      const { getAllByTestId } = renderStack({ gutter });

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${gutter}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${gutter}px`);
        }
      });
    });

    it(`ref를 받을 수 있어야 한다.`, () => {
      const {
        result: { current: ref },
      } = renderHook(() => useRef<HTMLDivElement>(null));

      renderStack({ ref });

      expect(ref.current).not.toBeNull();
    });
  });
});
