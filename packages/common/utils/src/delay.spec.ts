import { delay } from './delay';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return a promise which is resolved after given milliseconds', () => {
    const milliseconds = 3000;
    const promise = delay(milliseconds);

    jest.advanceTimersByTime(milliseconds);

    expect(promise).resolves.toBeUndefined();
  });
});
