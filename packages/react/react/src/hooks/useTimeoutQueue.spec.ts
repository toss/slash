import { renderHook } from '@testing-library/react';
import { useTimeoutQueue } from './useTimeoutQueue';

let mockSetTimeout: jest.SpyInstance;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.useFakeTimers();

  mockSetTimeout = jest.spyOn(window, 'setTimeout');
});

describe('useTimeoutQueue는', () => {
  it('Task를 enqueue 시킬 수 있고, 주어진 ms 이후 Task가 실행된다.', async () => {
    const { result } = renderHook(useTimeoutQueue);
    const timeouts = result.current;

    const MILLISECONDS = 5000;

    const task = jest.fn();
    timeouts.add(task, MILLISECONDS);

    jest.runAllTimers();

    expect(mockSetTimeout).toBeCalledWith(expect.any(Function), MILLISECONDS);

    jest.runAllTimers();

    expect(task).toBeCalledTimes(1);
  });

  it('실행되지 않은 Task는 안전하게 clear 된다.', () => {
    const TEST_TIMEOUT_ID = 3302;

    const setIntervalMock: any = () => {
      return TEST_TIMEOUT_ID;
    };
    jest.spyOn(window, 'setTimeout').mockImplementation(setIntervalMock);

    const clearIntervalMock = jest.spyOn(window, 'clearTimeout');

    const { result, unmount } = renderHook(useTimeoutQueue);
    const timeouts = result.current;

    const task = jest.fn();
    timeouts.add(task, 3000);

    unmount();

    expect(clearIntervalMock).toBeCalledTimes(1);
    expect(clearIntervalMock).toBeCalledWith(TEST_TIMEOUT_ID);
  });
});
