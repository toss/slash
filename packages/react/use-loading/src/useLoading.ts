import { useCallback, useMemo, useState } from 'react';

/**
 * @name useLoading
 * @description
 * Promise의 로딩 상태를 쉽게 관리할 수 있게 해주는 훅입니다.
 *
 * `useLoading` 은 `[isLoading: boolean, startLoading: (promise: Promise) => Promise]`의 Tuple을 반환합니다.
 *
 * - 첫 번째 값인 `isLoading` 은 처음에 `false` 로 시작합니다.
 * - 두 번째 값인 `startLoading`은 `promise`를 반환하는 함수입니다.
 *    - `startLoading`이 실행되고 인자로 주어진 Promise가 resolve 될 때까지 `isLoading`은 `true`가 됩니다.
 *    - 이후 그 Promise가 resolve되면 `isLoading` 은 다시 `false`가 됩니다.
 *
 * `useLoading`을 사용하는 정확한 방법은 아래 Example을 참고해주시기 바랍니다.
 *
 * ```typescript
 * const [isLoading, startLoading] = useLoading();
 * ```
 * @example
 * function postConfirmation(data: Data): Promise<Result> {
 *   return post.e2e<Result>('/api/sample/confirm', data);
 * }
 *
 * function ConfirmButton({ data }: { data: Data }) {
 *   const [loading, startTransition] = useLoading();
 *
 *   const handleSubmit = useCallback(() => {
 *     const result = await startTransition(postConfirmation(data));
 *     router.push(`/success?id=${result.id}`);
 *   }, [call])
 *
 *   return (
 *     <Button loading={loading} onClick={handleSubmit}>
 *       GoGo
 *     </Button>
 *   )
 * }
 */
export function useLoading(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
  const [loading, setLoading] = useState(false);
  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    try {
      setLoading(true);
      const data = await promise;
      return data;
    } finally {
      setLoading(false);
    }
  }, []);
  return useMemo(() => [loading, startTransition], [loading, startTransition]);
}
