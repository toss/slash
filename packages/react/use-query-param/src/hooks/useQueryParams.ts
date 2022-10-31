/** @tossdocs-ignore */
import { useMemo } from 'react';
import { useNextRouter } from './useNextRouter';

export function useQueryParams<T extends { [key: string]: string } = { [key: string]: string }>(): Partial<T> {
  const router = useNextRouter();

  return useMemo(() => {
    /** router.query, QS.parse에서 사용하는 타입인 ParsedUrlQuery가
     * 유효한 제네릭을 받지 않아 any로 처리합니다
     * packages/common/utils/src/queryString.ts 참고*/
    return router.query as any;
  }, [router]);
}
