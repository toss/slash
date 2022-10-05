declare const global: unknown;

/**
 * @name isServer
 * @description
 * 현재 JS 런타임이 서버 환경인지 (Node.js) 확인합니다.
 *
 * SSR 환경에서 서버에서만 실행되는 로직을 작성할 때 사용합니다.
 *
 * ```typescript
 * isServer(): boolean
 * ```
 * @example
 * if (isServer()) {
 *   // Node.js 서버 환경임이 보장된다.
 *   doSomethingInServer();
 * }
 */
export function isServer() {
  return typeof window === 'undefined' && typeof global !== 'undefined';
}
