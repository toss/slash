import { renderHook, act } from '@testing-library/react';
import { useMutation } from './useMutation';

describe('useMutation', () => {
  describe('() => Promise<Data>', () => {
    const mockedAPI = async () => ({ result: 'SUCCESS' });
    it('mutation 호출 전에는 data: undefined', () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
    it('mutation 호출 후 loading: true, 나머지 undefined', async () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      let promise: ReturnType<typeof mockedAPI>;
      act(() => {
        promise = result.current.mutate();
      });
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeUndefined();
      // hook 안에서 발생할 수 있는 effect는 무조건 act 안에서 종료되어야 함
      await act(async () => {
        await promise;
      });
    });
    it('mutation 완료 후 loading: false, data: promise의 결과', async () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      await act(async () => {
        await result.current.mutate();
      });
      process.nextTick(() => {
        expect(result.current.data).toStrictEqual({ result: 'SUCCESS' });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeUndefined();
      });
    });
    it('mutation 실패 시 에러 객체를 반환', async () => {
      const failingAPI = () => Promise.reject(new Error('sample error'));
      const { result } = renderHook(() => useMutation(failingAPI));
      await act(async () => {
        await result.current.mutate().catch(() => {});
      });
      process.nextTick(() => {
        expect(result.current.data).toBeUndefined();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe('sample error');
      });
    });
    it('mutation 완료 후 reset 호출 시 초기 상태로 복귀', async () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      await act(async () => {
        await result.current.mutate();
        result.current.reset();
      });
      process.nextTick(() => {
        expect(result.current.data).toBeUndefined();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeUndefined();
      });
    });
  });
  describe('(arg: Arg) => Promise<Data>', () => {
    const mockedAPI = async (id: number) => ({ result: `id: ${id}` });
    it('mutation 호출 전에는 data: undefined', () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
    it('mutation 호출 후 loading: true, 나머지 undefined', async () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      let promise: ReturnType<typeof mockedAPI>;
      act(() => {
        promise = result.current.mutate(10);
      });
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeUndefined();
      // hook 안에서 발생할 수 있는 effect는 무조건 act 안에서 종료되어야 함
      await act(async () => {
        await promise;
      });
    });
    it('mutation 완료 후 loading: false, data: promise의 결과', async () => {
      const { result } = renderHook(() => useMutation(mockedAPI));
      await act(async () => {
        await result.current.mutate(10);
      });
      process.nextTick(() => {
        expect(result.current.data).toStrictEqual({ result: 'id: 10' });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeUndefined();
      });
    });
    it('mutation 실패 시 에러 객체를 반환', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const failingAPI = (_: number) => Promise.reject(new Error('sample error'));
      const { result } = renderHook(() => useMutation(failingAPI));
      await act(async () => {
        await result.current.mutate(10).catch(() => {});
      });
      process.nextTick(() => {
        expect(result.current.data).toBeUndefined();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe('sample error');
      });
    });
  });
  describe('(arg1: Arg1, arg2: Arg2) => Promise<Data> (type inference 테스트)', () => {
    it('mutation 완료 후 loading: false, data: promise의 결과', async () => {
      const mockedAPI = async (arg1: number, arg2: string) => ({ result: `${arg1}-${arg2}` });
      const { result } = renderHook(() => useMutation(mockedAPI));
      await act(async () => {
        await result.current.mutate(10, 'success');
      });
      process.nextTick(() => {
        expect(1).toBe(1);
        expect(result.current.data).toStrictEqual({ result: '10-success' });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeUndefined();
      });
    });
  });
});
