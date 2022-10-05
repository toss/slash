import { renderHook } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { NextRouter, useRouter } from 'next/router';
import { useQueryParams } from './useQueryParams';

jest.mock('next/router');

const mockUseRouter = mocked(useRouter as () => Partial<NextRouter>);

describe('useQueryParams는', () => {
  it('한개의 쿼리 파라미터를 리턴한다.', () => {
    const router = {
      isReady: true,
      pathname: '/',
      query: { foo: 'bar' },
    };

    mockUseRouter.mockReturnValue(router);

    const { result } = renderHook(() => useQueryParams());

    expect(result.current).toBe(router.query);
  });

  it('다수의 쿼리 파라미터를 리턴한다.', () => {
    const router = {
      isReady: true,
      pathname: '/',
      query: { foo: 'bar', toss: 'core' },
    };

    mockUseRouter.mockReturnValue(router);

    const { result } = renderHook(() => useQueryParams());

    expect(result.current).toBe(router.query);
  });

  it('쿼리 파라미터가 없을 때 undefined를 리턴한다.', () => {
    const router = {
      isReady: true,
      pathname: '/',
    };

    mockUseRouter.mockReturnValue(router);

    const { result } = renderHook(() => useQueryParams());

    expect(result.current).toBeUndefined();
  });
});
