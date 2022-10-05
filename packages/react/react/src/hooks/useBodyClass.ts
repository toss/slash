import { isServer } from '@tossteam/utils';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * @description
 * document.body 에 className을 추가할 수 있습니다.
 *
 * @example
 * useBodyClass('useNativeScrolling');
 */
export default function useBodyClass(className: string) {
  useIsomorphicLayoutEffect(() => {
    if (isServer()) {
      return;
    }
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}
