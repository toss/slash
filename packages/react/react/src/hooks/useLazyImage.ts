import { noop } from '@toss/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

interface Props {
  src: string;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  onLoadComplete?: () => void;
  onInView?: () => void;
}

/** @tossdocs-ignore */
export function useLazyImage({
  src,
  rootMargin,
  threshold,
  root,
  onLoadComplete: _onLoadComplete,
  onInView: _onInView,
}: Props) {
  const ref = useRef<HTMLImageElement>(null);

  const onInView = usePreservedCallback(_onInView ?? noop);
  const onLoadComplete = usePreservedCallback(_onLoadComplete ?? noop);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerLoadEventHandler = useCallback(
    (element: HTMLImageElement) => {
      setIsLoading(true);

      element.onload = () => {
        setIsLoading(false);
        onLoadComplete();
      };
    },
    [onLoadComplete]
  );

  const insertImageSrc = useCallback(
    (element: HTMLImageElement) => {
      element.src = src;

      if (element.complete) {
        onLoadComplete();
        return;
      }
      registerLoadEventHandler(element);
    },
    [src, onLoadComplete, registerLoadEventHandler]
  );

  const intersectionAction = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry) {
        if (entry.isIntersecting) {
          const targetImgElement = entry.target as HTMLImageElement;

          insertImageSrc(targetImgElement);

          /**
           * Execute additional actions when the target element is exposed in the Viewport (or the element you specified as root)
           * For example, logging processing
           */
          onInView();

          /**
           * Once the image has been loaded once, unobserve its target element to prevent repeated load.
           */
          observer.unobserve(targetImgElement);
        }
      }
    },
    [insertImageSrc, onInView]
  );

  useEffect(() => {
    const imgElement = ref.current;

    if (!imgElement) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      insertImageSrc(imgElement);
      return;
    }

    if (imgElement.getAttribute('src')) {
      console.warn('If the "src" attribute is initially in an "img" tag, lazy load is not applied.');
      registerLoadEventHandler(imgElement);
      return;
    }

    const observer = new IntersectionObserver(intersectionAction, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(imgElement);

    return () => {
      observer.unobserve(imgElement);
    };
  }, [root, threshold, rootMargin, registerLoadEventHandler, insertImageSrc, intersectionAction]);

  return { ref, isLoading } as const;
}
