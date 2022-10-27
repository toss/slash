/** @tossdocs-ignore */
declare const global: unknown;

export function isServer() {
  return typeof window === 'undefined' && typeof global !== 'undefined';
}
