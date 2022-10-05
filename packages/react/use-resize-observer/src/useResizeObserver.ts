import { usePreservedCallback } from '@tossteam/use-preserved-callback';
import { useRefEffect } from '@tossteam/use-ref-effect';

export type OnResize = (entry: ResizeObserverEntry) => void;

/**
 * @name useResizeObserver
 * @description
 * Ref를 노출하는 컴포넌트에 ResizeObserver를 구독하여 DOM 요소의 크기 변화를 감지합니다.
 * ResizeObserver API가 요구됩니다. 해당 API가 지원되지 않은 브라우저를 타겟하는 경우 polyfill을 적절히 추가해주세요.
 *
 * ```
 * function useResizeObserver<E extends HTMLElement = HTMLElement>(onResize: OnResize): EffectRef<E>;
 * ```
 *
 * @example
 * const ref = useResizeObserver<HTMLButtonElement>((entry) => {
 *   const { width, height } = entry.contentRect;
 *   console.log('size changed:', width, height);
 * });
 *
 * <button ref={ref}>...</button>
 */
export function useResizeObserver<E extends HTMLElement = HTMLElement>(onResize: OnResize) {
  const resizeCallback = usePreservedCallback(onResize);
  const ref = useRefEffect<E>(
    elem => {
      const observer = new ResizeObserver(entries => {
        if (entries[0] != null) {
          resizeCallback(entries[0]);
        }
      });
      observer.observe(elem);

      return () => {
        observer.unobserve(elem);
      };
    },
    [resizeCallback]
  );

  return ref;
}
