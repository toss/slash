import { useNextRouter } from './useNextRouter';
import { mocked } from 'jest-mock';
import Router, { useRouter } from 'next/router';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import { renderWithSuspense } from '../utils';
import { waitFor } from '@testing-library/react';

jest.mock('next/router');

const mockRouter = mocked(Router);
const mockUseRouter = mocked(useRouter as () => Partial<NextRouter>);

describe('useNextRouter', () => {
  describe('isReady가 false이면', () => {
    it('suspense를 발생시킨다.', async () => {
      mockUseRouter.mockReturnValue({
        isReady: false,
        pathname: '/',
        query: {},
      });

      const { checkDidSuspend } = renderWithSuspense(() => {
        return useNextRouter({ suspense: true });
      });

      expect(checkDidSuspend()).toBe(true);
    });

    it('suspense가 풀리면 정상적인 router를 반환한다.', async () => {
      const router = {
        isReady: false,
        pathname: '/',
        query: {
          foo: 'bar',
        },
      };

      mockUseRouter.mockReturnValue(router);

      jest.spyOn(mockRouter, 'ready').mockImplementation(resolve => {
        router.isReady = true;
        resolve();
      });

      const { result } = renderWithSuspense(() => {
        return useNextRouter({ suspense: true });
      });

      await waitFor(() => {
        expect(result.current).toEqual(router);
      });
    });
  });
});
