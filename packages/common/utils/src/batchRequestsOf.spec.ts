import { batchRequestsOf } from './batchRequestsOf';

jest.useFakeTimers();

describe('batchRequestsOf', () => {
  it('should accumulate requests until the action completes, and then execute all gathered requests', async () => {
    const actualRequest = jest.fn();
    actualRequest.mockImplementation(async () => timeout(500, 'foo'));

    const batchedRequest = batchRequestsOf(actualRequest);

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();

    const subscription1 = batchedRequest().then(subscriber1);
    const subscription2 = batchedRequest().then(subscriber2);

    expect(subscriber1).not.toBeCalled();
    expect(subscriber2).not.toBeCalled();

    jest.runAllTimers();
    await Promise.all([subscription1, subscription2]);

    expect(subscriber1).toBeCalledTimes(1);
    expect(subscriber2).toBeCalledTimes(1);

    const subscriber3 = jest.fn();

    const subscription3 = batchedRequest().then(subscriber3);

    expect(subscriber3).not.toBeCalled();

    jest.runAllTimers();
    await subscription3;

    // subscriber1, subscriber2는 중복해서 실행되어서는 안된다.
    expect(subscriber1).toBeCalledTimes(1);
    expect(subscriber2).toBeCalledTimes(1);
    expect(subscriber3).toBeCalledTimes(1);
  });

  it('should pass the resolved value of the action as arguments to the requests', async () => {
    const actualRequest = jest.fn();
    const actualResponse = { foo: 'bar' };
    actualRequest.mockImplementation(async () => timeout(500, actualResponse));

    const requestInBatch = batchRequestsOf(actualRequest);

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();

    const subscription1 = requestInBatch().then(subscriber1);
    const subscription2 = requestInBatch().then(subscriber2);

    expect(subscriber1).not.toBeCalled();
    expect(subscriber2).not.toBeCalled();

    jest.runAllTimers();
    await Promise.all([subscription1, subscription2]);

    // subscriber1, subscriber2는 중복해서 실행되어서는 안된다.
    expect(subscriber1).toBeCalledTimes(1);
    expect(subscriber2).toBeCalledTimes(1);
    expect(subscriber1).toBeCalledWith(actualResponse);
    expect(subscriber2).toBeCalledWith(actualResponse);
  });

  it('should only release the buffer corresponding to a specific key', async () => {
    const resolvingValue = 'yayyay';
    const neverEndingPromise = new Promise(() => {});

    const resolvingKey = 'RESOLVE';
    const neverEndingKey = 'NEVER_ENDING';

    const actualRequest = jest.fn<any, [string]>();
    actualRequest.mockImplementation(async (key: string) => {
      switch (key) {
        case resolvingKey:
          return timeout(1000, resolvingValue);
        case neverEndingKey:
        default:
          return neverEndingPromise;
      }
    });

    const batchedRequest = batchRequestsOf(actualRequest);

    const subscriberToResolve = jest.fn();
    const subscriptionToResolve = batchedRequest(resolvingKey).then(subscriberToResolve);

    const subscriberNotToResolve = jest.fn();
    batchedRequest(neverEndingKey).then(subscriberNotToResolve);

    await runAllTimers();

    expect(subscriberNotToResolve).not.toBeCalled();

    await subscriptionToResolve;

    expect(subscriberToResolve).toBeCalledTimes(1);
    expect(subscriberToResolve).toBeCalledWith(resolvingValue);
  });
});

async function runAllTimers() {
  jest.runAllTimers();
  // 쌓인 Promise microtask들을 모두 실행시킴
  await Promise.resolve();
}

function timeout<T>(ms: number, result: T) {
  return new Promise<T>(resolve => {
    setTimeout(() => resolve(result), ms);
  });
}
