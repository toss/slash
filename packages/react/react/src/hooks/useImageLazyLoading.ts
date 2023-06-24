import { useRefEffect } from './useRefEffect';

interface Props {
  src: string;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  onAction?: () => void;
}

/** @tossdocs-ignore */
export function useImageLazyLoading<Element extends HTMLElement>({
  src,
  rootMargin,
  threshold,
  root,
  onAction,
}: Props) {
  const ref = useRefEffect<Element>(element => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (element.getAttribute('src')) {
      console.error('If the "src" attribute is present in the "img" tag, lazy load is not applied. ');
    }

    const insertImageSrc = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry) {
        if (entry.isIntersecting) {
          const imgElement = entry.target as HTMLImageElement;
          imgElement.src = src;

          if (onAction) {
            onAction();
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
