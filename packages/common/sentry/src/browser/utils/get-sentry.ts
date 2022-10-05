/** @tossdocs-ignore */
import { Sentry } from '../../types';

declare const window: Window & {
  Sentry?: Sentry;
};

export function getSentry() {
  if (window.Sentry == null && process.env.NODE_ENV !== 'production') {
    console.warn(
      `window에 Sentry 객체가 없습니다. toss-frontend에서 Next.js로 개발하고 계시다면, _document.tsx에서 TossDocument를 사용하고 있는지 확인해주세요.`
    );
  }

  return window.Sentry;
}
