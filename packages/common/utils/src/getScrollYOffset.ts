/** @tossdocs-ignore */
import { isServer } from './device/index';

export function getScrollYOffset(): number {
  if (isServer) {
    return 0;
  }

  /**
   * 보통의 경우 scrollLeft, scrollTop으로 스크롤 위치를 구할 수 있습니다. 하지만 크롬과 파이어폭스의 경우
   * 'document.body' 또는 'document.documentElement' 중 스크롤 위치를 구하는 곳이 다릅니다. 따라서 'scrollTop'
   * 값이 다를 수 있습니다. 'document.documentElement'의 Bounding Rect를 구하는 것은 일관성이 있습니다.
   *
   * 자세한 내용은 이 문서를 참조해 주세요: https://github.com/angular/material2/blob/master/src/cdk/scrolling/viewport-ruler.ts#L102
   */
  const documentElement = document.documentElement;
  const documentRect = documentElement.getBoundingClientRect();

  return -documentRect.top || document.body.scrollTop || window.scrollY || documentElement.scrollTop || 0;
}
