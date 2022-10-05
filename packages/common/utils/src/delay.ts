/**
 * @name delay
 * @description
 * 입력한 시간(ms) 후에 resolve되는 Promise를 리턴합니다.
 * ```typescript
 * function delay(ms: number): Promise<void>;
 * ```
 * @example
 * await delay(3000);
 * // 3초 후
 * doSomething();
 */
export function delay(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
}
