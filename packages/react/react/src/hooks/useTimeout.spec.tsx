import { useState } from 'react';
import { renderHook, render, act } from '@testing-library/react';
import useTimeout from './useTimeout';

jest.useFakeTimers();

describe('useTimeout', () => {
  it('정해진 시간이 지난 뒤에, 콜백을 실행한다', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, 3000));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(3000);

    expect(callback).toBeCalled();
  });

  it('rerender 등으로 인해 delay가 초기화 되면 안된다', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => {
      return useTimeout(() => {
        callback();
      }, 3000);
    });

    jest.advanceTimersByTime(1500);

    rerender();
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1500);

    expect(callback).toBeCalled();
  });

  it('콜백은 항상 최신 상태값을 가지고 실행된다', () => {
    function TestingComponent() {
      const [state, setState] = useState(1);

      useTimeout(() => {
        act(() => {
          setState(state + 1);
        });
      }, 1500);

      useTimeout(() => {
        act(() => {
          setState(state + 1);
        });
      }, 3000);

      return <div>{state}</div>;
    }

    const { container } = render(<TestingComponent />);

    expect(container.textContent).toBe('1');

    jest.advanceTimersByTime(1500);

    expect(container.textContent).toBe('2');

    jest.advanceTimersByTime(1500);

    expect(container.textContent).toBe('3');
  });
});
