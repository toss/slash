import { usePreservedCallback } from './usePreservedCallback';
import { useRefEffect } from './useRefEffect';

export type OnResize = (entry: ResizeObserverEntry) => void;

/** @tossdocs-ignore */
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
