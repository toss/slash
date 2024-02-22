import { renderHook } from '@testing-library/react';
import { useInterval } from './useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  it('Should execute a callback every time a set time passes.', () => {
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

  it('should work the same with number options as well.', () => {
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
