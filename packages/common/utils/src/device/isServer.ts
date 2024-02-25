/** @tossdocs-ignore */
declare const global: unknown;

export const isServer = (function () {
  return typeof window === 'undefined' && typeof global !== 'undefined';
})();
