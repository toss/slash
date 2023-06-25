import { useRefEffect } from './useRefEffect';

interface Props {
  src: string;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
  onAction?: () => void;
}

/** @tossdocs-ignore */
export function useImageLazyLoading<Element extends HTMLImageElement>({
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

    if (element.tagName !== 'IMG') {
      throw new Error("The target element can only be an 'img' tag.");
    }

    // Checks if undefined or null.
    if (src == null) {
      throw new Error("The 'useImageLazyLoading' hook requires the 'src' prop to be a required value.");
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
