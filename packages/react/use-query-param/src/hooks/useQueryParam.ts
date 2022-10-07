/** @tossdocs-ignore */
import { useNextRouter } from './useNextRouter';

interface Options<T> {
  parser?: (val: string) => T;
  suspense?: boolean;
}

/**
 * @name useQueryParam
 * @description
 * 인자로 주어진 쿼리 파라미터의 값을 가져옵니다.
 *
 * Static export된 Next.js 서비스에서 안전하게 쿼리 파라미터의 값을 Suspense로 가져옵니다.
 * `useQueryParam` Hook은 `router.isReady` 값을 매번 체크해야 하는 번거로움을 없앱니다.
 *
 * @example
 * const value = useQueryParam<'a' | 'b' | 'c'>('type');
 *
 * // URL이 https://toss.im/page?type=c 인 경우 -> 'c'
 * // URL이 https://toss.im/page        인 경우 -> undefined
 *
 * @example
 * const valueWithDefault = useQueryParam<'a' | 'b'>('type') ?? 'a';
 *
 * @example
 * const parsedValue = useQueryParam('type', Number) ?? 0;
 *
 * @see https://nextjs.org/docs/api-reference/next/router - router.isReady 관련 docs
 */
export function useQueryParam<T = string>(name: string): T | undefined;
export function useQueryParam<T = string>(name: string, options: Options<T>): T | undefined;
export function useQueryParam<T = string>(name: string, options?: Options<T>) {
  const router = useNextRouter({ suspense: options?.suspense });

  const value = router.query[name] as string | undefined;

  if (value == null || options?.parser == null) {
    return value;
  } else {
    return options.parser(value);
  }
}
