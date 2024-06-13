/** @tossdocs-ignore */
import Router from 'next/router.js';

export function waitForRouterReady() {
  return new Promise<void>(resolve => {
    Router.ready(resolve);
  });
}
