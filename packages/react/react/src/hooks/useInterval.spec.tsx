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

  it('Should not set the interval when delay is null.', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, { delay: null }));

    jest.advanceTimersByTime(3000);

    expect(callback).not.toBeCalled();
  });

  it('Should execute the callback immediately when the trailing option is false.', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, { delay: 3000, trailing: false }));

    expect(callback).toBeCalledTimes(1);
  });

  it('Should not execute the callback when enable option is false', () => {
    const savedInterval = Window.setinterval;
    Window.setInterval = jest.fn();
    const callback = jest.fn();

    renderHook(() => useInterval(callback, { delay: 3000, enabled: false }));
    expect(Window.setInterval).not.toBeCalled();
    jest.advanceTimersByTime(3000);

    expect(callback).not.toBeCalled();
    Window.setInterval = savedInterval;
  });

  it('Should resume the interval When enable options become true.', () => {
    const callback = jest.fn();
    const props = { delay: 3000, enabled: false };

    const { rerender } = renderHook(() => useInterval(callback, props));
    jest.advanceTimersByTime(3000);

    expect(callback).not.toBeCalled();

    props.enabled = true;
    rerender();

    jest.advanceTimersByTime(3000);

    expect(callback).toBeCalled();
  });
});
