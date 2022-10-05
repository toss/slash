/** @tossdocs-ignore */
import { isClient } from './device/index';

/**
 * @deprecated v18에서 제거 예정입니다.
 */
// ts-prune-ignore-next
export function init() {
  if (!(isClient() && localStorage && localStorage.getItem && localStorage.getItem('test:debugger') === 'true')) {
    return;
  }
  try {
    const script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = () => (window as any).eruda.init();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Fail to init debugger: '${e}'`);
  }
}

/**
 * @deprecated v18에서 제거 예정입니다.
 */
// ts-prune-ignore-next
export function toggle() {
  if (!(isClient() && localStorage)) {
    return;
  }
  if (localStorage.getItem('test:debugger')) {
    localStorage.removeItem('test:debugger');
  } else {
    localStorage.setItem('test:debugger', 'true');
  }
}
