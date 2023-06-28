import { useRefEffect } from './useRefEffect';

interface Props {
  src: string;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  onInView?: () => void;
}

/** @tossdocs-ignore */
export function useLazyImage({ src, rootMargin, threshold, root, onInView }: Props) {
  const ref = useRefEffect<HTMLImageElement>(element => {
    if (typeof IntersectionObserver === 'undefined') {
      element.src = src;
      return;
    }

    if (element.getAttribute('src')) {
      console.warn('If the "src" attribute is initially in an "img" tag, lazy load is not applied.');
      return;
    }

    const insertImageSrc = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry) {
        if (entry.isIntersecting) {
          const imgElement = entry.target as HTMLImageElement;
          imgElement.src = src;

          // Execute additional actions when the target element is exposed in the Viewport (or the element you specified as root)
          // For example, logging processing.
          if (onInView) {
            onInView();
          }

          // Once the image has been loaded once, unobserve its target element to prevent repeated load.
          observer.unobserve(entry.target);
        }
      }
    };

    const observer = new IntersectionObserver(insertImageSrc, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return ref;
}
