import { act, renderHook } from '@testing-library/react';
import { Serializable, useStorageState } from './useStorageState';

describe('useLocalStorageState는', () => {
  it('초기 상태를 스토리지에서 가져온다.', () => {
    const { storage, render, key } = createFixture();

    const mockReturnValue = { foo: 'bar' };
    storage.get.mockReturnValue(JSON.stringify(mockReturnValue));

    const { result } = render();

    expect(storage.get).toBeCalledTimes(1);
    expect(storage.get).toBeCalledWith(key);
    expect(result.current[0]).toEqual(mockReturnValue);
  });

  it('스토리지에 저장된 값이 유효한 JSON 문자열이 아니면, 값은 undefined가 된다.', () => {
    const { storage, render } = createFixture();

    storage.get.mockReturnValue('{ "to$$');

    const { result } = render();

    expect(result.current[0]).toBeUndefined();
  });

  it('스토리지에서 값을 찾을 수 없으면, 값은 undefined가 된다.', () => {
    const { storage, render } = createFixture();

    const mockReturnValue = null;
    storage.get.mockReturnValue(JSON.stringify(mockReturnValue));

    const { result } = render();

    expect(result.current[0]).toBeUndefined();
  });

  it('스토리지에서 값을 찾을 수 없는데 defaultValue가 있으면, 값은 defaultValue가 된다.', () => {
    const defaultValue = 'to$$';
    const { storage, render } = createFixture({ defaultValue });

    const mockReturnValue = null;
    storage.get.mockReturnValue(JSON.stringify(mockReturnValue));

    const { result } = render();

    expect(result.current[0]).toEqual(defaultValue);
  });

  it('setState를 했을 때, 스토리지에 값이 저장된다.', () => {
    const { storage, render, key } = createFixture<{ [key: string]: string }>();

    storage.get.mockReturnValue(JSON.stringify(null));

    const { result } = render();

    const valueToSet = { foo: 'bar' };

    act(() => {
      const [, set] = result.current;

      set(valueToSet);
    });

    expect(result.current[0]).toEqual(valueToSet);
    expect(storage.set).toBeCalledTimes(1);
    expect(storage.set).toBeCalledWith(key, JSON.stringify(valueToSet));
  });

  it('undefined를 set하면 스토리지에서 값을 지운다.', () => {
    const { storage, render, key } = createFixture();

    storage.get.mockReturnValue(JSON.stringify(null));

    const { result } = render();

    const valueToSet = undefined;

    act(() => {
      const [, set] = result.current;

      set(valueToSet);
    });

    expect(result.current[0]).toEqual(valueToSet);
    expect(storage.remove).toBeCalledTimes(1);
    expect(storage.remove).toBeCalledWith(key);
  });

  it('setState에 함수를 넘겼을 때, 스토리지에 값이 저장된다.', () => {
    const { storage, render, key } = createFixture<number>();

    storage.get.mockReturnValue(JSON.stringify(1));

    const { result } = render();

    act(() => {
      const [, set] = result.current;

      set(x => x! + 1);
    });

    const expectedValue = 2;

    expect(result.current[0]).toEqual(expectedValue);
    expect(storage.set).toBeCalledTimes(1);
    expect(storage.set).toBeCalledWith(key, JSON.stringify(expectedValue));
  });

  it('실제 storage의 값이 바뀌더라도 refresh를 통해서 동기화할 수 있다.', () => {
    const { storage, render, key } = createFixture();

    const mockReturnValue = { foo: 'bar' };
    storage.get.mockReturnValue(JSON.stringify(mockReturnValue));

    const { result } = render();

    expect(result.current[0]).toEqual(mockReturnValue);

    storage.get.mockReturnValueOnce(JSON.stringify({ foo: 'baz' }));

    act(() => {
      const refresh = result.current[2];
      refresh();
    });

    expect(storage.get).toBeCalledTimes(2);
    expect(storage.get).toBeCalledWith(key);

    expect(result.current[0]).toEqual({ foo: 'baz' });
  });
});

function createMockStorage() {
  return {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    clear: jest.fn(),
  };
}

function createFixture<T>({ defaultValue }: { defaultValue?: Serializable<T> } = {}) {
  const key = '@@test-key';
  const storage = createMockStorage();
  const render = () => renderHook(() => useStorageState<T>(key, { storage, defaultValue }));

  return { storage, render, key };
}
