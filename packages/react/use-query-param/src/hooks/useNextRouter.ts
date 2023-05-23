/** @tossdocs-ignore */
import { NextRouter, useRouter } from 'next/router';
import { waitForRouterReady } from '../utils/waitForRouterReady';

interface Options {
  suspense?: boolean;
}

interface ReadyNextRouter extends NextRouter {
  isReady: true;
}

export function useNextRouter(options: { suspense: true }): ReadyNextRouter;
export function useNextRouter(): ReadyNextRouter;
export function useNextRouter(options?: { suspense?: boolean }): NextRouter;
export function useNextRouter(options: Options = { suspense: true }) {
  const router = useRouter();

  if (options.suspense && !router.isReady) {
    throw waitForRouterReady();
  }

  return router;
}
