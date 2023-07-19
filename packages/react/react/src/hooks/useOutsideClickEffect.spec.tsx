import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { range } from '@toss/utils';
import { useCallback, useState } from 'react';
import { useOutsideClickEffect } from './useOutsideClickEffect';

afterEach(() => {
  jest.clearAllMocks();
});

describe('useOutsideClickEffect', () => {
  interface PrepareParams {
    containerCount?: number;
    onEffect?: () => void;
  }

  function prepare({ containerCount = 1, onEffect = jest.fn() }: PrepareParams = {}) {
    function Test() {
      const [containers, setContainers] = useState<Array<React.RefObject<HTMLElement>>>([]);
      useOutsideClickEffect(containers, onEffect);

      const updateContainer = useCallback((elem: HTMLDivElement | null) => {
        if (elem != null) {
          setContainers(containers => [...containers, { current: elem }]);
        }
      }, []);

      return (
        <>
          <div data-testid="outside">outside</div>
          {range(containerCount).map(index => (
            <div key={index} ref={updateContainer} data-testid={`container-${index}`}>
              container {index}
              <span data-testid={`inside-${index}`}>inside {index}</span>
            </div>
          ))}
        </>
      );
    }

    return render(<Test />);
  }

  it('컨테이너 바깥에 위치한 DOM에서 이벤트가 발생하면 콜백이 호출된다.', async () => {
    const onEffect = jest.fn();
    prepare({ onEffect });

    userEvent.click(screen.getByTestId('container-0'));
    expect(onEffect).not.toHaveBeenCalled();

    userEvent.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalled();
    });

    document.body.click();

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalled();
    });
  });

  it('컨테이너 안쪽에 위치한 DOM에서 이벤트가 발생하면 콜백이 호출되지 않는다.', () => {
    const onEffect = jest.fn();
    prepare({ onEffect });

    userEvent.click(screen.getByTestId('inside-0'));
    expect(onEffect).not.toHaveBeenCalled();
  });

  it('컨테이너를 여러개 지정할 수 있다.', async () => {
    const onEffect = jest.fn();
    prepare({ containerCount: 3, onEffect });

    userEvent.click(screen.getByTestId('container-0'));
    expect(onEffect).not.toHaveBeenCalled();

    userEvent.click(screen.getByTestId('container-1'));
    expect(onEffect).not.toHaveBeenCalled();

    userEvent.click(screen.getByTestId('container-2'));
    expect(onEffect).not.toHaveBeenCalled();

    userEvent.click(screen.getByTestId('inside-2'));
    expect(onEffect).not.toHaveBeenCalled();

    userEvent.click(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(onEffect).toHaveBeenCalled();
    });
  });

  it('언마운트 된 이후에는 콜백이 호출되지 않는다.', () => {
    const onEffect = jest.fn();
    const { unmount } = prepare({ onEffect });

    unmount();
    document.body.click();
    expect(onEffect).not.toHaveBeenCalled();
  });
});
