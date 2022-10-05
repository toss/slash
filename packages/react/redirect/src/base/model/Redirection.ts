export interface BaseRedirectionOptions {
  destination: string;
}

export type RedirectionOptions<T extends BaseRedirectionOptions = BaseRedirectionOptions> = {
  onRedirect?: (options: T) => void;
} & T;

/**
 * @description
 * Redirection을 정의하는 프로토콜입니다.
 *
 * 함께 제공하는 RedirectionErrorBoundary , isRedirection type guard 등으로 받아서 사용할 수 있습니다.
 *
 * Serverside Redirection은 브릿지 페이지 등에서 기존의 Clientside Redirection과 달리 깜빡임 등이 없고 속도가 더 빨라 사용자 경험을 좋게합니다.
 *
 * ```ts
 * // 리다이렉트될 path를 명시합니다.
 * throw Redirection.of({ destination: '/issue/introduction/under-fourteen' });
 * ```
 *
 * ### 예시 1
 *
 * ```ts
 * function Bridge() {
 *   return <TransparentBackground />;
 * }
 *
 * const RedirectByUserTypeResource = createIsomorphicResource({
 *   key: 'userType',
 *   fetcher: async ({ get }) => {
 *     const { internationalAge } = UserEntity.fromPayload(await get('/api-web/v3/user/common'));
 *
 *     if (internationalAge < 14) {
 *       throw Redirection.of({ destination: '/issue/introduction/under-fourteen' });
 *     }
 *
 *     if (internationalAge >= 14 && internationalAge < 17) {
 *       throw Redirection.of({ destination: '/issue/introduction/over-fourteen' });
 *     }
 *
 *     throw Redirection.of({ destination: '/issue/introduction/guardian' });
 *   },
 * });
 *
 * export default isomorphicPage(Bridge, {
 *   requiredResources: [RedirectByUserTypeResource],
 * });
 *
 * ```
 *
 * ### 예시 2
 *
 * ```ts
 * function Page() {
 *   const token  = useIsomorphicResource(SessionTokenResource).data
 *
 *   return ...;
 * }
 *
 * const SessionTokenResource = createIsomorphicResource({
 *   key: 'SessionToken',
 *   fetcher: async ({ get }) => {
 *     const {token, expired} = await get<{token: string; expired: boolean}>('/api-web/v3/family/token');
 *     if (expired) {
 *       throw Redirection.of({ destination: '/error/token-expired' });
 *     }
 *
 *     return token
 *   },
 * });
 *
 * export default isomorphicPage(Bridge, {
 *   requiredResources: [SessionTokenResource],
 * });
 * ```
 */
export class Redirection<T extends BaseRedirectionOptions = BaseRedirectionOptions> extends Error {
  readonly name = 'Redirection';
  readonly options: RedirectionOptions<T>;

  static of<T extends Redirection<K>, K extends BaseRedirectionOptions>(
    this: StaticThis<T, K>,
    options: RedirectionOptions<K>
  ) {
    return new this(options);
  }

  constructor(options: RedirectionOptions<T>) {
    super(`Redirection to ${options.destination}`);
    this.options = options;
  }

  async redirect() {
    if (this.options.onRedirect == null) {
      throw new Error('Redirection method not defined');
    }
    this.options.onRedirect?.(this.options);
  }
}

export function isRedirection<T extends BaseRedirectionOptions = BaseRedirectionOptions>(
  data: unknown
): data is Redirection<T> {
  return data != null && (data as any)?.name === 'Redirection';
}

type StaticThis<T, K> = { new (args: K): T };
