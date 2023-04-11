/** @tossdocs-ignore */
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

export function safeSmoothScrollTo(element: Element | Window, { top: scrollTargetY }: { top: number }, speed = 2000) {
  smoothScrollTo(element, { top: scrollTargetY }, { speed });
}

type ScrollConfig = { speed: number } | { duration: number };

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
