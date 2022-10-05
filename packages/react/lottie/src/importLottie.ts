/** @tossdocs-ignore */
import type lottie from 'lottie-web';

export type LottiePlayer = typeof lottie;

export const LOTTIE_URL = 'https://static.toss.im/frontend/libraries/lottie.min.js';
const LOTTIE_SCRIPT_ID = 'toss-lottie-script';

declare let window: Window & {
  lottie?: LottiePlayer;
};

export function importLottie() {
  return new Promise<typeof lottie>(resolve => {
    if (window.lottie != null) {
      resolve(window.lottie);
      return;
    }

    const existingScript = document.getElementById(LOTTIE_SCRIPT_ID);
    if (existingScript != null) {
      existingScript.addEventListener('load', () => {
        resolve(window.lottie!);
      });
      return;
    }

    const script = document.createElement('script');
    script.id = LOTTIE_SCRIPT_ID;
    script.src = LOTTIE_URL;
    script.crossOrigin = 'anonymous';
    script.addEventListener('load', () => {
      resolve(window.lottie!);
    });

    document.body.appendChild(script);
  });
}
