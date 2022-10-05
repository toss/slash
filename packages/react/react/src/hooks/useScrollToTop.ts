import { useEffect } from 'react';
import { safeScrollTo } from '@tossteam/utils';

/**
 * @description
 * globalContentArea 이 있으면 그걸 기준으로 없다면 window를 기준으로 safeScrollTo(top: 0) 를 할 수 있는 hook입니다.
 *
 * ```ts
 * useScrollToTop(deps: any[] = []);
 * ```
 *
 * @example
 * useScrollToTop();
 */
export default function useScrollToTop(deps: any[] = []) {
  useEffect(
    () => {
      const globalContentArea = document.querySelector('.global-content-area');

      if (globalContentArea !== null) {
        safeScrollTo(globalContentArea, { top: 0 });
      }

      safeScrollTo(window, { top: 0 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
}
