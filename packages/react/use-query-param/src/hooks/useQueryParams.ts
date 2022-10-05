/** @tossdocs-ignore */
import { useMemo } from 'react';
import { useNextRouter } from './useNextRouter';

/**
 * @name useQueryParams
 * @description
 * 모든 쿼리 파라미터의 값을 객체로 가져옵니다.
 *
 * Static export된 Next.js 서비스에서 안전하게 쿼리 파라미터의 값을 Suspense로 가져옵니다.
 * `useQueryParams` Hook은 `router.isReady` 값을 매번 체크해야 하는 번거로움을 없앱니다.
 *
 * @example
 * // URL이 https://toss.im/page?id=raon0211 인 경우 -> { id: 'raon0211' }
 * // URL이 https://toss.im/page             인 경우 -> undefined
 * const params = useQueryParams();
 *
 * const id = params.id;
 *
 * @see https://www.notion.so/tossteam/Next-js-CSR-Query-1a953f2dad11406499b14e5d62a83899 - Next.js CSR에서의 Query 파라미터 대응
 * @see https://nextjs.org/docs/api-reference/next/router - router.isReady 관련 docs
 */
export function useQueryParams<T extends { [key: string]: string } = { [key: string]: string }>(): Partial<T> {
  const router = useNextRouter();

  return useMemo(() => {
    /** router.query, QS.parse에서 사용하는 타입인 ParsedUrlQuery가
     * 유효한 제네릭을 받지 않아 any로 처리합니다
     * packages/utils/src/queryString.ts 참고*/
    return router.query as any;
  }, [router]);
}
