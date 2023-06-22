import { usePreservedCallback } from './usePreservedCallback';
import { useRefEffect } from './useRefEffect';

interface UseActionObserverProps {
  onAction: () => void;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  repetitionCount?: number;
}

/** @tossdocs-ignore */
export function useActionObserver<E extends HTMLElement = HTMLElement>({
  onAction,
  repetitionCount,
  threshold,
  rootMargin,
  root,
}: UseActionObserverProps) {
  const actionCallback = usePreservedCallback(onAction);
  const ref = useRefEffect<E>(
    elem => {
      let callCount = 0;

      const observer = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          if (repetitionCount != null && repetitionCount <= callCount) {
            observer.unobserve(elem);
            return;
          }

          if (entry != null) {
            if (entry.isIntersecting) {
              callCount++;
              actionCallback();
            }
          }
        },
        {
          threshold,
          root,
          rootMargin,
        }
      );
      observer.observe(elem);

      return () => {
        observer.unobserve(elem);
      };
    },
    [actionCallback]
  );

  return ref;
}
