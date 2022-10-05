/** @tossdocs-ignore */
import { Sentry } from '../../types.js';
import { getSentry } from './get-sentry.js';

// FIXME(@raon0211):
// Sentry lazy-loading으로 인해 사용하는 코드.
// window.Sentry로 접근하는 Sentry 객체가 lazy loading 전후로 바뀌기 때문에,
// const Sentry = window.Sentry 와 같이 작성하면 오래된 window.Sentry 객체를 참조하여 에러가 난다.
// Sentry 함수를 호출할 때마다 새로 window.Sentry 값을 참조해야 함.
export function buildSentry(): Sentry {
  return {
    init: (...args) => {
      return getSentry()?.init(...args);
    },
    captureException: (...args) => {
      return getSentry()?.captureException(...args);
    },
    captureEvent: (...args) => {
      return getSentry()?.captureEvent(...args);
    },
    captureMessage: (...args) => {
      return getSentry()?.captureMessage(...args);
    },
    withScope: (...args) => {
      return getSentry()?.withScope(...args);
    },
    configureScope: (...args) => {
      return getSentry()?.configureScope(...args);
    },
    addBreadcrumb: (...args) => {
      return getSentry()?.addBreadcrumb(...args);
    },
    setUser: (...args) => {
      return getSentry()?.setUser(...args);
    },
    setTags: (...args) => {
      return getSentry()?.setTags(...args);
    },
    setTag: (...args) => {
      return getSentry()?.setTag(...args);
    },
    setExtras: (...args) => {
      return getSentry()?.setExtras(...args);
    },
    setExtra: (...args) => {
      return getSentry()?.setExtra(...args);
    },
    setContext: (...args) => {
      return getSentry()?.setContext(...args);
    },
    onLoad: (...args) => {
      return getSentry()?.onLoad(...args);
    },
  } as Sentry;
}
