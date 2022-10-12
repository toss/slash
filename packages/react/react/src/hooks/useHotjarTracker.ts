import { useEffect } from 'react';

const HOTJAR_SCRIPT_ID = 'TOSS_HOTJAR';

interface HotjarOptions {
  id: number;
  enable: boolean;
}

/**
 * @description
 * hotjar 관련 script 태그를 쉽게 추가할 수 있는 hook 입니다.
 *
 * @example
 * useHotjarTracker({
 *   id: 1579349,
 *   enable: getOperationalEnvironment() === 'live',
 * });
 */
export default function useHotjarTracker({ id, enable }: HotjarOptions) {
  useEffect(() => {
    if (!enable || document.getElementById(HOTJAR_SCRIPT_ID) != null) {
      return;
    }

    const script = document.createElement('script');
    script.id = HOTJAR_SCRIPT_ID;
    script.type = 'text/javascript';
    script.innerHTML = `(function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:${id},hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;

    document.head.appendChild(script);

    return () => {
      script?.parentNode?.removeChild(script);
    };
  }, [enable, id]);
}
