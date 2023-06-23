import { useRefEffect } from './useRefEffect';

interface DataSet {
  dataset: {
    src: string;
  };
}

interface Props {
  onAction?: () => void;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
}

type ImageElement = HTMLImageElement & DataSet;

/** @tossdocs-ignore */
export function useImageLazyLoading<Element extends HTMLElement>({
  onAction,
  root = null,
  rootMargin = '0px 0px 0px 0px',
  threshold = [0],
}: Props) {
  const ref = useRefEffect<Element>(element => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (!element.dataset.src) {
      throw new Error('Add the image url to the "data-src" attribute of the "img" tag');
    }

    const insertImageSrc = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry) {
        if (entry.isIntersecting) {
          const imgElement = entry.target as ImageElement;
          imgElement.src = imgElement.dataset.src;

          if (onAction) {
            onAction();
          }

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
