import { renderHook, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Router, { NextRouter, useRouter } from 'next/router';
import { renderWithSuspense } from '../utils';
import { useQueryParam } from './useQueryParam';

jest.mock('next/router');

const mockRouter = mocked(Router);
const mockUseRouter = mocked(useRouter as () => Partial<NextRouter>);

describe('useQueryParam', () => {
  it('can read the query parameter with a name matching the first parameter.', () => {
    const router = {
      isReady: true,
      pathname: '/',
      query: { foo: 'bar' },
    };

    mockUseRouter.mockReturnValue(router);

    const { result } = renderHook(() => useQueryParam('foo'));

    expect(result.current).toBe(router.query.foo);
  });

  it('can parse the value through the `parser` option', () => {
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

  describe('when using the `suspense` option', () => {
    it('does not have the query parameter value when `isReady: false`', () => {
      mockUseRouter.mockReturnValue({
        isReady: false,
        pathname: '/',
        query: { foo: 'bar' },
      });

      const { checkDidSuspend } = renderWithSuspense(() => useQueryParam('foo', { suspense: true }));

      expect(checkDidSuspend()).toBe(true);
    });

    it('returns the correct query parameter value when `isReady: true`', async () => {
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

  describe('when using the `required` option', () => {
    it('throws an error when the value is not present', () => {
      const router = {
        isReady: true,
        pathname: '/',
        query: { foo: '123' },
      };

      mockUseRouter.mockReturnValue(router);

      expect(() => renderHook(() => useQueryParam('bar', { required: true }))).toThrowError();
    });
  });
});
