import { renderHook } from '@testing-library/react';
import { useInterval } from './useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  it('정해진 시간이 지날때마다, 콜백을 실행한다', () => {
    const callback = jest.fn();

    renderHook(() =>
      useInterval(callback, {
        delay: 3000,
      })
    );

    jest.advanceTimersByTime(2900);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(200);

    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(3000);

    expect(callback).toBeCalledTimes(2);
  });

  it('number option도 동일하게실행한다', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, 3000));

    jest.advanceTimersByTime(2900);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(200);

    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(3000);

    expect(callback).toBeCalledTimes(2);
  });
});
