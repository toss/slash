import { useRef, useCallback, useEffect } from 'react';

/* Possible politeness levels. */
type AriaLivePoliteness = 'off' | 'polite' | 'assertive';

let liveElement: HTMLElement | null = null;
const visuallyHiddenStyle = `position: absolute;width: 1px;height: 1px;margin: -1px;padding: 0;overflow: hidden;border: 0;clip: rect(0, 0, 0, 0);`;

function getLiveElement() {
  if (liveElement !== null) {
    return liveElement;
  }

  liveElement = document.createElement('div');

  liveElement.classList.add('liveAnnouncerElement');
  liveElement.setAttribute('style', visuallyHiddenStyle);
  liveElement.setAttribute('aria-atomic', 'true');

  document.body.appendChild(liveElement);

  return liveElement;
}

function removeLiveElement() {
  if (liveElement !== null) {
    liveElement.parentNode?.removeChild(liveElement);
    liveElement = null;
  }
}

interface AnnounceOptions {
  message: string;
  politeness?: AriaLivePoliteness;
  /*
   * 몇 milliseconds 이후에 Announcer Element를 제거할지 시간을 설정합니다.
   * 단, Announcer Element가 100ms 이후에 삽입되므로, 대기시간은 100ms 이후에 적용됩니다.
   */
  duration?: number;
}

/**
 * @description
 * 스크린리더 사용자에게 메시지를 표시합니다.
 *
 * @example
 * const { announce, clear } = useLiveAnnouncer();
 *
 * announce('안녕 세상!');
 * clear();
 */
export default function useLiveAnnouncer() {
  const previousTimeout = useRef<number>();

  const clear = useCallback(() => {
    getLiveElement().textContent = '';
  }, []);

  const announce = useCallback(
    ({ message, politeness = 'polite', duration }: AnnounceOptions) => {
      clear();
      window.clearTimeout(previousTimeout.current);

      const liveEl = getLiveElement();
      liveEl.setAttribute('aria-live', politeness);

      return new Promise<void>(resolve => {
        window.clearTimeout(previousTimeout.current);

        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        previousTimeout.current = window.setTimeout(() => {
          liveEl.textContent = message;
          resolve();

          if (typeof duration === 'number') {
            previousTimeout.current = window.setTimeout(() => clear(), duration);
          }
        }, 100);
      });
    },
    [clear]
  );

  // 컴포넌트가 제거되면 "liveElement"를 제거합니다.
  useEffect(
    () => () => {
      window.clearTimeout(previousTimeout.current);
      removeLiveElement();
    },
    []
  );

  return { announce, clear };
}
