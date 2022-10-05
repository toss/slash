import { renderHook, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Router, { NextRouter, useRouter } from 'next/router';
import { useQueryParam } from './useQueryParam';
import { renderWithSuspense } from '../utils';

jest.mock('next/router');

const mockRouter = mocked(Router);
const mockUseRouter = mocked(useRouter as () => Partial<NextRouter>);

describe('useQueryParam', () => {
  it('첫 번째 파라미터와 일치하는 이름의 쿼리 파라미터를 읽을 수 있다.', () => {
    const router = {
      isReady: true,
      pathname: '/',
      query: { foo: 'bar' },
    };

    mockUseRouter.mockReturnValue(router);

    const { result } = renderHook(() => useQueryParam('foo'));

    expect(result.current).toBe(router.query.foo);
  });

  it('`parser` 옵션을 통해 값을 파싱할 수 있다.', () => {
    const router = {
      isReady: true,
      pathname: '/',
      query: { foo: '123', bar: 'true' },
    };

    mockUseRouter.mockReturnValue(router);

    const { result, rerender } = renderHook(({ name, parser }) => useQueryParam(name, { parser }), {
      initialProps: { name: 'foo', parser: Number as (val: string | string[]) => unknown },
    });

    expect(typeof result.current).toBe('number');

    rerender({ name: 'bar', parser: value => value === 'true' });

    expect(typeof result.current).toBe('boolean');
  });

  describe('`suspense` 옵션을 사용할 경우', () => {
    it('`isReady: false`일 때 쿼리 파라미터 값이 존재하지 않는다.', () => {
      mockUseRouter.mockReturnValue({
        isReady: false,
        pathname: '/',
        query: { foo: 'bar' },
      });

      const { checkDidSuspend } = renderWithSuspense(() => useQueryParam('foo', { suspense: true }));

      expect(checkDidSuspend()).toBe(true);
    });

    it('`isReady: true`일 때 정상적인 쿼리 파라미터 값을 반환한다.', async () => {
      const router = {
        isReady: false,
        pathname: '/',
        query: { foo: 'bar' },
      };

      mockUseRouter.mockReturnValue(router);

      jest.spyOn(mockRouter, 'ready').mockImplementation(resolve => {
        router.isReady = true;
        resolve();
      });

      const { checkDidSuspend, result } = renderWithSuspense(() => useQueryParam('foo', { suspense: true }));

      await waitFor(() => {
        expect(result.current).toEqual(router.query.foo);
      });

      expect(checkDidSuspend()).toBe(true);
    });
  });
});
