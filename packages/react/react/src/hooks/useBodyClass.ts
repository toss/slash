import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * @description
 * document.body 에 className을 추가할 수 있습니다.
 */
export default function useBodyClass(className: string) {
  useIsomorphicLayoutEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
}
