/** @jsxImportSource @emotion/react */
import { render, renderHook } from '@testing-library/react';
import { ComponentProps, useRef } from 'react';

import { Stack } from './Stack';

const items = ['1', '2', '3'];

const DEFAULT_GUTTER = 24;

describe('<Stack />', () => {
  it(`should have flex-direction: column.`, () => {
    const { container } = render(<Stack>test</Stack>);

    expect(container.querySelector('div')).toHaveStyle('flex-direction: column');
  });

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

    it(`should have flex-direction: column.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: column');
    });

    it(`should have top margin from the second node onwards.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`should accept top margin via the gutter prop.`, () => {
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

    it(`should be able to accept a ref.`, () => {
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

    it(`should have flex-direction: column.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: column');
    });

    it(`should have top margin from the second node onwards.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-top: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`should accept top margin via the gutter prop.`, () => {
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

    it(`should be able to accept a ref.`, () => {
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

    it(`should have flex-direction: row.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: row');
    });

    it(`should have left margin from the second node onwards.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`should accept left margin via the gutter prop.`, () => {
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

    it(`should have flex-direction: row.`, () => {
      const { getByTestId } = renderStack();

      expect(getByTestId('stack')).toHaveStyle('flex-direction: row');
    });

    it(`should have left margin from the second node onwards.`, () => {
      const { getAllByTestId } = renderStack();

      getAllByTestId('stack-item').forEach((element, index) => {
        if (index > 0) {
          expect(element).toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        } else {
          expect(element).not.toHaveStyle(`margin-left: ${DEFAULT_GUTTER}px`);
        }
      });
    });

    it(`should accept left margin via the gutter prop.`, () => {
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

    it(`should be able to accept a ref.`, () => {
      const {
        result: { current: ref },
      } = renderHook(() => useRef<HTMLDivElement>(null));

      renderStack({ ref });

      expect(ref.current).not.toBeNull();
    });
  });
});
