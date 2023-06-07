import { renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const completionTime = 500;
  const timeBeforeCompletion = 490;
  const remainingTime = 10;

  it('Debounce is designed to only execute once.', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, completionTime));

    result.current();

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(completionTime);
    jest.advanceTimersByTime(completionTime);
    jest.advanceTimersByTime(completionTime);

    expect(callback).toBeCalledTimes(1);
  });

  it('The function will not be executed until the specified time has elapsed', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, completionTime));

    result.current();

    jest.advanceTimersByTime(timeBeforeCompletion);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(remainingTime);

    expect(callback).toBeCalledTimes(1);
  });

  it("If the debounce is triggered before the 'wait' time specified in the parameter has elapsed, it will reset.", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, completionTime));

    result.current();

    jest.advanceTimersByTime(timeBeforeCompletion);

    expect(callback).not.toBeCalled();

    result.current();

    jest.advanceTimersByTime(timeBeforeCompletion);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(completionTime);

    expect(callback).toBeCalledTimes(1);
  });

  it('When it is unmounted, the debounce is canceled.', () => {
    const callback = jest.fn();

    const { result, unmount } = renderHook(() => useDebounce(callback, completionTime));

    result.current();

    jest.advanceTimersByTime(timeBeforeCompletion);

    expect(callback).not.toBeCalled();

    unmount();

    jest.runAllTimers();

    expect(callback).not.toBeCalled();
  });
});
