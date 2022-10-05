type AnyFn = (...args: any[]) => any;

/**
 * @description 런타임에서 함수를 MonkeyPatch하고 싶을 때 사용합니다. 주로 브라우저 환경에서 데모 페이지를 테스트하고 싶을 때 사용합니다.
 *
 * @example
 * // getAllPayMethods.ts
 * import { serviceLocator } from '@tossteam/service-locator';
 *
 * export default async function getPayMethods(token: string;) {
 *   const payMethods = await get.apiGateway(`/api-web/v3/pays/payment-methods?token=${token}`);
 *   return payMethods;
 * }
 * serviceLocator.register(getPayMethods);
 *
 * // usePayMethods.ts
 * export default function usePayMethods(token: string) {
 *   return useQuery(['payMethods', token], async () => {
 *     const payMethods = await serviceLocator.resolve(getAllPayMethods)(token);
 *     return payMethods;
 *   })
 * }
 *
 *
 * // DemoPage.tsx
 * serviceLocator.override(getPayMethods as any, () => Promise.resolve([{ name: 'dummy1' }, {name: 'dummy2'} ]));
 *
 * export default function DemoPage() {
 *   const dummyPayMethods = usePayMethods('dummyToken')
 *
 *   return dummyPayMethods.map(d => <div>${d.name}</div>)
 * }
 */
class ServiceLocator {
  private _services = new Map<string, unknown>();
  private _overrides = new Map<string, unknown>();

  /**
   * @name ServiceLocator.register
   * @description MonkeyPatch할 함수를 등록합니다
   *
   * ```ts
   * (method) ServiceLocator.register(fn: AnyFn): void;
   * ```
   *
   * @example
   * // right
   * const hi = () => {}; // or function hi() {};
   * serviceLocator.register(hi);
   *
   * // wrong
   * serviceLocator.register(() => {})
   */
  public register(fn: AnyFn): void {
    if (fn.name === '') {
      throw new Error('Function must have a name');
    }
    this._services.set(fn.name, fn);
  }

  /**
   * @name ServiceLocator.override
   * @description 기존 등록된 함수에 새로운 구현을 덮어씌웁니다.
   *
   * ```ts
   * (method) ServiceLocator.override<T extends AnyFn>(
   *   // 기존에 등록된 함수를 넣습니다 (reference)
   *   originalFn: T,
   *   // 새로 변경할 함수를 넣습니다. 익명함수도 가능합니다
   *   overridingFn: T,
   * ): void;
   * ```
   *
   * @example
   * function getName(name) { return api.get('/user/name'); };
   * serviceLocator.register(getName);
   * serviceLocator.override(getName, () => Promise.resolve("John"));
   *
   * await serviceLocator.resolve(getName)(); // 'John'
   */
  public override<T extends AnyFn>(originalFn: T, overridingFn: T) {
    this._overrides.set(originalFn.name, overridingFn);
  }

  /**
   * @name ServiceLocator.reset
   * @description 모든 override를 제거하고 registered 함수로 되돌립니다.
   *
   * ```ts
   * (method) ServiceLocator.reset(): void;
   * ```
   */
  public reset() {
    this._overrides.clear();
  }

  /**
   * @name ServiceLocator.resolve
   * @description 등록된 함수를 반환합니다
   *
   * ```ts
   * (method) ServiceLocator.resolve<T extends AnyFn>(fn: T): T;
   * ```
   *
   * @example
   * function hi(name) { alert('hi, ' + name); };
   * serviceLocator.resolve(hi)('John'); // 'hi, John'
   */
  public resolve<T extends AnyFn>(fn: T): T {
    if (this._overrides.has(fn.name)) {
      return this._overrides.get(fn.name) as T;
    }
    if (this._services.has(fn.name)) {
      return this._services.get(fn.name) as T;
    }
    throw new Error('Function not registered');
  }
}

export const serviceLocator = new ServiceLocator();
