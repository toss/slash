import { waitFor } from '@testing-library/react';
import { mockIntersectionObserver } from './mockIntersectionObserver';

describe('mockIntersectionObserver', () => {
  afterEach(() => {
    mockIntersectionObserver.cleanup();
  });
  it('setup()을 호출하면 window.IntersectionObserver를 모킹한다', async () => {
    const defaultIntersectionObserver = window.IntersectionObserver;
    mockIntersectionObserver.setup();
    expect(IntersectionObserver).not.toBe(defaultIntersectionObserver);
  });
  it('cleanup()을 호출하면 window.IntersectionObserver를 원래대로 복구한다', async () => {
    const defaultIntersectionObserver = window.IntersectionObserver;
    mockIntersectionObserver.setup();
    mockIntersectionObserver.cleanup();
    expect(IntersectionObserver).toBe(defaultIntersectionObserver);
  });
  it('observer.intersect()에 element를 전달하면 해당 element에 등록된 핸들러들이 호출된다', async () => {
    const onIntersectionObserverStart1 = jest.fn();
    const onIntersectionObserverStart2 = jest.fn();
    const element = document.createElement('div');
    mockIntersectionObserver.setup();

    const observer1 = new IntersectionObserver(onIntersectionObserverStart1);
    const observer2 = new IntersectionObserver(onIntersectionObserverStart2);

    observer1.observe(element);
    mockIntersectionObserver.intersect(element, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart1).toBeCalledTimes(1);
    });

    expect(onIntersectionObserverStart2).not.toBeCalled();

    observer2.observe(element);
    mockIntersectionObserver.intersect(element, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart1).toBeCalledTimes(2);
      expect(onIntersectionObserverStart2).toBeCalledTimes(1);
    });

    observer1.unobserve(element);
    mockIntersectionObserver.intersect(element, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart1).toBeCalledTimes(2);
      expect(onIntersectionObserverStart2).toBeCalledTimes(2);
    });
  });
  it('observer.intersect에 자식 element를 전달하면 부모 element에 등록된 핸들러들이 호출된다', async () => {
    const onIntersectionObserverStart1 = jest.fn();
    const onIntersectionObserverStart2 = jest.fn();
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');
    parentElement.appendChild(childElement);
    mockIntersectionObserver.setup();

    const observer1 = new IntersectionObserver(onIntersectionObserverStart1);
    const observer2 = new IntersectionObserver(onIntersectionObserverStart2);

    observer1.observe(parentElement);
    mockIntersectionObserver.intersect(childElement, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart1).toBeCalledTimes(1);
    });

    expect(onIntersectionObserverStart2).not.toBeCalled();

    observer2.observe(parentElement);
    mockIntersectionObserver.intersect(childElement, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart1).toBeCalledTimes(2);
      expect(onIntersectionObserverStart2).toBeCalledTimes(1);
    });

    observer1.unobserve(parentElement);
    mockIntersectionObserver.intersect(childElement, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart1).toBeCalledTimes(2);
      expect(onIntersectionObserverStart2).toBeCalledTimes(2);
    });
  });
  it('disconnect()가 호출되면 observer 인스턴스에 등록한 함수가 모두 해제되어 observer.intersect()를 호출해도 불리지 않는다', async () => {
    const onIntersectionObserverStart1 = jest.fn();
    const onIntersectionObserverStart2 = jest.fn();
    const element = document.createElement('div');
    mockIntersectionObserver.setup();

    const observer1 = new IntersectionObserver(onIntersectionObserverStart1);
    const observer2 = new IntersectionObserver(onIntersectionObserverStart2);

    observer1.observe(element);
    observer2.observe(element);

    observer1.disconnect();

    mockIntersectionObserver.intersect(element, { ratio: 1 });

    await waitFor(() => {
      expect(onIntersectionObserverStart2).toBeCalledTimes(1);
    });

    expect(onIntersectionObserverStart1).not.toBeCalled();
  });
});
