import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/** @tossdocs-ignore */
export function useStyleSheetInjection(cssText: string) {
  useIsomorphicLayoutEffect(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssText));

    const headElem = document.getElementsByTagName('head')[0];

    if (headElem === undefined) {
      return;
    }

    headElem.appendChild(style);

    return () => {
      headElem.removeChild(style);
    };
  }, [cssText]);
}
