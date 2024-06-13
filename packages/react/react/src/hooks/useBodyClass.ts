import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/** @tossdocs-ignore */
export function useBodyClass(className: string) {
  useIsomorphicLayoutEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}
