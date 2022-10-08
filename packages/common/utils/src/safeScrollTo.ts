/**
 * @name safeScrollTo
 * @description
 * IE, 구형 안드로이드에선 element.scrollTo 함수가 없는 브라우저에서도 안전하게 스크롤 하기 위한 함수
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
 *
 * ```typescript
 * function safeScrollTo(
 *   // 스크롤할 요소
 *   element: Element | Window | null,
 *   // 스크롤 옵션
 *   options: ScrollToOptions,
 * ): void;
 * ```
 *
 * @example
 * safeScrollTo(window, { top: 0, left: 0 });
 */
export function safeScrollTo(element: Element | Window | null, options: ScrollToOptions) {
  if (!element) {
    return;
  }
  if (isWindow(element)) {
    element.scrollTo(
      options.left !== undefined ? options.left : element.scrollX,
      options.top !== undefined ? options.top : element.scrollY
    );
  } else if (element.scrollTo) {
    element.scrollTo(options);
  } else {
    const { left, top } = options;

    if (top !== undefined) {
      element.scrollTop = top;
    }

    if (left !== undefined) {
      element.scrollLeft = left;
    }
  }
}

/**
 * @name safeSmoothScrollTo
 * @description smoothScrollTo와 동일한 함수입니다. safe라는 prefix가 추가되었습니다.
 */
export function safeSmoothScrollTo(element: Element | Window, { top: scrollTargetY }: { top: number }, speed = 2000) {
  smoothScrollTo(element, { top: scrollTargetY }, { speed });
}

type ScrollConfig = { speed: number } | { duration: number };

/**
 * @name smoothScrollTo
 * @description Smooth하게 Scroll을 합니다.
 *
 * ```typescript
 * function smoothScrollTo(
 *   element: Element | Window,
 *   scrollTo: { top: number },
 *   // @default { speed: 2000 }
 *   config: {
 *     // 스크롤을 0.1s < scroll delta / speed < 0.8s 동안 실행합니다. 예를들면 1000px, speed = 2000 인 경우, 스크롤은 0.5s 동안 실행됩니다.
 *     speed: number
 *   } | {
 *     // 스크롤을 duration (in ms) 동안 실행합니다.
 *     duration: number
 *   };
 * )
 * ```
 *
 * @example
 * smoothScrollTo(window, { top: 2000 }, { speed: 1000 });
 */
export async function smoothScrollTo(
  element: Element | Window,
  scrollTo: { top: number },
  config: ScrollConfig = { speed: 2000 }
) {
  return new Promise<void>(res => {
    const scrollY = isWindow(element) ? element.scrollY : element.scrollTop;
    const totalAnimatingTime =
      'duration' in config
        ? config.duration / 1000
        : Math.max(0.1, Math.min(Math.abs(scrollY - scrollTo.top) / config.speed, 0.8));

    function ease(animationProgress: number) {
      return -0.5 * (Math.cos(Math.PI * animationProgress) - 1);
    }

    function tick(currentTime: number) {
      const progress = currentTime / totalAnimatingTime;
      const easedProgress = ease(progress);

      if (progress < 1) {
        window.requestAnimationFrame(() => tick(currentTime + 1 / 60));
        safeScrollTo(element, {
          top: scrollY + (scrollTo.top - scrollY) * easedProgress,
        });
      } else {
        safeScrollTo(element, scrollTo);
        res();
      }
    }

    tick(0);
  });
}

function isWindow(el: Element | Window): el is Window {
  return el === window;
}
