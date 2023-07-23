import { act, renderHook } from '@testing-library/react';
import { useLoading } from './useLoading';

describe('useLoading', () => {
  describe('() => Promise<Data>', () => {
    const mockedAPI = async () => ({ result: 'SUCCESS' });
    it('should false, when startTransition is not called', () => {
      const { result } = renderHook(() => useLoading());
      expect(result.current[0]).toBe(false);
    });
    it('should true, when startTransition is called', async () => {
      const { result } = renderHook(() => useLoading());
      let promise: ReturnType<typeof mockedAPI>;
      act(() => {
        promise = result.current[1](mockedAPI());
      });
      expect(result.current[0]).toBe(true);
      // Mutation that may occur in the hook must be terminated in the act unconditionally
      await act(async () => {
        await promise;
      });
    });
    it(`should false, when startTransition's promise is resolved`, async () => {
      const { result } = renderHook(() => useLoading());
      await act(async () => {
        await result.current[1](mockedAPI());
      });
      process.nextTick(() => {
        expect(result.current[0]).toBe(false);
      });
    });
    it(`should false, when startTransition's promise is rejected`, async () => {
      const failingAPI = () => Promise.reject(new Error('sample error'));
      const { result } = renderHook(() => useLoading());
      await act(async () => {
        await result.current[1](failingAPI()).catch(() => {});
      });
      process.nextTick(() => {
        expect(result.current[0]).toBe(false);
      });
    });
  });
  describe('(arg: Arg) => Promise<Data>', () => {
    const mockedAPI = async (id: number) => ({ result: `id: ${id}` });
    it('should false, when startTransition is not called', () => {
      const { result } = renderHook(() => useLoading());
      expect(result.current[0]).toBe(false);
    });
    it('should true, when startTransition is called', async () => {
      const { result } = renderHook(() => useLoading());
      let promise: ReturnType<typeof mockedAPI>;
      act(() => {
        promise = result.current[1](mockedAPI(10));
      });
      expect(result.current[0]).toBe(true);
      // hook 안에서 발생할 수 있는 mutation은 무조건 act 안에서 종료되어야 함
      await act(async () => {
        await promise;
      });
    });
    it(`should false, when startTransition's promise is resolved`, async () => {
      const { result } = renderHook(() => useLoading());
      await act(async () => {
        await result.current[1](mockedAPI(10));
      });
      process.nextTick(() => {
        expect(result.current[0]).toBe(false);
      });
    });
    it(`should false, when startTransition's promise is rejected`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const failingAPI = (_: number) => Promise.reject(new Error('sample error'));
      const { result } = renderHook(() => useLoading());
      await act(async () => {
        await result.current[1](failingAPI(10)).catch(() => {});
      });
      process.nextTick(() => {
        expect(result.current[0]).toBe(false);
      });
    });
  });
  describe('(arg1: Arg1, arg2: Arg2) => Promise<Data> (type inference 테스트)', () => {
    it(`should false, when startTransition's promise is resolved`, async () => {
      const mockedAPI = async (arg1: number, arg2: string) => ({ result: `${arg1}-${arg2}` });
      const { result } = renderHook(() => useLoading());
      await act(async () => {
        await result.current[1](mockedAPI(10, 'success'));
      });
      process.nextTick(() => {
        expect(result.current[0]).toBe(false);
      });
    });
  });
});
