/**
 * @name isTossCoreURL
 * @description
 * 주어진 URL이 토스코어의 URL인지 판단합니다.
 *
 * - host가 `toss.im` 이거나 `.toss.im` 으로 끝나는지 확인합니다.
 *
 * @example
 * isTossCoreURL('https://toss.im') // => true
 * isTossCoreURL('https://service.toss.im') // => true
 * isTossCoreURL('https://toss.im/ko') // => true
 * isTossCoreURL('https://service.toss.im/ko') // => true
 * isTossCoreURL('https://mytoss.im') // => false
 */
export function isTossCoreURL(url: string) {
  try {
    const hostname = new URL(url).hostname;

    return hostname.endsWith('.toss.im') || hostname === 'toss.im';
  } catch {
    return false;
  }
}

const TOSS_PROTOCOLS = [
  'supertoss:',
  'supertoss-alpha:',
  'supertoss-staging:',
  'supertoss-live:',
  'servicetoss:',
  'servicetoss-alpha:',
  'servicetoss-staging:',
  'servicetoss-live:',
];

/**
 * @name isTossScheme
 * @description
 * 주어진 URL이 토스 스킴인지 판단합니다.
 *
 * - 프로토콜이 `supertoss:`, `supertoss-alpha:`, `supertoss-staging:`, `supertoss-live:`, `servicetoss:`, `servicetoss-alpha:`, `servicetoss-staging:`, `servicetoss-live:` 중 하나인지 판단합니다.
 *
 * @example
 * isTossScheme('supertoss://home') // => true
 * isTossScheme('hackertoss://home') // => false
 */
export function isTossScheme(url: string) {
  try {
    const protocol = new URL(url).protocol;

    return TOSS_PROTOCOLS.includes(protocol);
  } catch {
    return false;
  }
}

function normalizeToFullURL(url: string) {
  const isAbsolute = url.startsWith('/');

  if (isAbsolute) {
    const currentOrigin = new URL(window.location.href).origin;

    return `${currentOrigin}${url}`;
  }

  return url;
}

export const TossCoreURLs = {
  /**
   * @name TossCoreURLs.ensure
   * @description
   * 주어진 URL이 토스코어의 URL인지 확인하고, 토스코어의 URL이 아니라면 에러를 throw 합니다.
   *
   * - host가 `toss.im` 이거나 `.toss.im` 으로 끝나는지 확인합니다.
   * - 프로토콜이 `supertoss:`, `supertoss-alpha:`, `supertoss-staging:`, `supertoss-live:`, `servicetoss:`, `servicetoss-alpha:`, `servicetoss-staging:`, `servicetoss-live:` 중 하나인지 판단합니다.
   *
   * @example
   * const scheme =  TossCoreURLs.ensure('https://toss.im') // 에러를 던지지 않음
   * const scheme2 = TossCoreURLs.ensure('https://mytoss.im') // 에러를 던짐
   * const scheme3 = TossCoreURLs.ensure('supertoss://home') // 에러를 던지지 않음
   * @example
   * import { TossCoreURLs } from '@tossteam/utils';
   *
   * const successURL = QS.parse().successURL;
   *
   * // successURL이 토스코어 URL 또는 스킴이 아니면 에러가 발생합니다.
   * window.location.href = TossCoreURLs.ensure(successURL);
   */
  ensure: (_url: string) => {
    const url = normalizeToFullURL(_url);

    if (isTossCoreURL(url) || isTossScheme(url)) {
      return _url;
    }

    throw new Error(`올바르지 않은 주소입니다. (${_url})`);
  },
  /**
   * @name TossCoreURLs.navigateTo
   * @description
   * 주어진 URL로 이동하기 전, URL이 토스코어의 URL인지 확인합니다. 토스코어의 URL이 아니라면 에러를 throw 합니다.
   *
   * - host가 `toss.im` 이거나 `.toss.im` 으로 끝나는지 확인합니다.
   * - 프로토콜이 `supertoss:`, `supertoss-alpha:`, `supertoss-staging:`, `supertoss-live:`, `servicetoss:`, `servicetoss-alpha:`, `servicetoss-staging:`, `servicetoss-live:` 중 하나인지 판단합니다.
   *
   * @example
   * TossCoreURLs.navigateTo('https://toss.im') // 에러를 던지지 않음
   * TossCoreURLs.navigateTo('https://hackertoss.im') // 에러를 던짐
   * TossCoreURLs.navigateTo('supertoss://home') // 에러를 던지지 않음
   *
   * @example
   * import { TossCoreURLs } from '@tossteam/utils';
   *
   * const successURL = QS.parse().successURL;
   *
   * // successURL이 토스코어 URL 또는 스킴이 아니면 에러가 발생합니다.
   * TossCoreURLs.navigateTo(successURL);
   */
  navigateTo: (url: string) => {
    window.location.href = TossCoreURLs.ensure(url);
  },
};
