import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * @description
 * css 문자열을 inject 할 수 있는 hook입니다.
 * style 태그 형태가 head 태그에 appendChild로 들어갑니다.
 */
export default function useStyleSheetInjection(cssText: string) {
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
