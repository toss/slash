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
      const [containers, setContainers] = useState<HTMLDivElement[]>([]);
      useOutsideClickEffect(containers, onEffect);

      const updateContainer = useCallback((elem: HTMLDivElement | null) => {
        if (elem != null) {
          setContainers(prev => [...prev, elem]);
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

  it('should call the callback when an event occurs outside the container', async () => {
    const user = userEvent.setup();
    const onEffect = jest.fn();
    prepare({ onEffect });

    await user.click(screen.getByTestId('container-0'));
    expect(onEffect).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalledTimes(1);
    });

    document.body.click();

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalledTimes(2);
    });
  });

  it('should not call the callback when an event occurs inside the container', async () => {
    const user = userEvent.setup();
    const onEffect = jest.fn();
    prepare({ onEffect });

    await user.click(screen.getByTestId('inside-0'));
    expect(onEffect).not.toHaveBeenCalled();
  });

  it('should support multiple containers', async () => {
    const user = userEvent.setup();
    const onEffect = jest.fn();
    prepare({ containerCount: 3, onEffect });

    await user.click(screen.getByTestId('container-0'));
    expect(onEffect).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('container-1'));
    expect(onEffect).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('container-2'));
    expect(onEffect).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('inside-2'));
    expect(onEffect).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalled();
    });
  });

  it('should not call the callback after the component is unmounted.', () => {
    const onEffect = jest.fn();
    const { unmount } = prepare({ onEffect });

    unmount();
    document.body.click();
    expect(onEffect).not.toHaveBeenCalled();
  });
});
