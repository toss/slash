import { retryRequestsOf } from './retryRequestsOf';

describe('retryable는', () => {
  it('1번 재시도할 수 있다.', async () => {
    const task = jest.fn();

    const retryingTask = retryRequestsOf(task, { retries: 1 });
    const result = 'yay';

    task.mockRejectedValueOnce(new Error('error!'));
    task.mockResolvedValueOnce(result);

    await expect(retryingTask()).resolves.toEqual(result);
    expect(task).toBeCalledTimes(2);
  });

  it('n번 재시도할 수 있다.', async () => {
    const retries = 3;
    const task = jest.fn();

    const retryingTask = retryRequestsOf(task, { retries: 3 });
    const result = 'yay';

    for (let i = 0; i < retries - 1; i++) {
      task.mockRejectedValueOnce(new Error('error!'));
    }
    task.mockResolvedValueOnce(result);

    await expect(retryingTask()).resolves.toEqual(result);
    expect(task).toBeCalledTimes(retries);
  });

  it('계속 실패하면 (재시도 설정 횟수 + 1)번만큼 함수를 호출하고, 실패한 에러를 그대로 던진다.', async () => {
    const retries = 3;
    const task = jest.fn();

    const retryingTask = retryRequestsOf(task, { retries: 3 });

    const error = new Error('error!');
    task.mockRejectedValue(error);

    await expect(retryingTask()).rejects.toEqual(error);
    expect(task).toBeCalledTimes(retries + 1);
  });

  it('인자를 넘길 수 있다.', async () => {
    const task = jest.fn<any, [string]>();

    const retryingTask = retryRequestsOf(task, { retries: 1 });
    const arg = 'argarg';
    const result = 'yay';

    task.mockRejectedValueOnce(new Error('error!'));
    task.mockResolvedValueOnce(result);

    await expect(retryingTask(arg)).resolves.toEqual(result);
    expect(task).toBeCalledTimes(2);
    expect(task).toBeCalledWith(arg);
  });
});
