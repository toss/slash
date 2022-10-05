import { useEffect, useState } from 'react';

/**
 * @description
 * Component의 mount 여부를 알 수 있는 hook 입니다.
 *
 * SSR 환경에서 실제로 컴포넌트가 브라우저에서 mount 된 이후에 어떤 동작을 실행하기 위해서 사용합니다.
 *
 * - 이 함수가 아니라 `isServer()` 함수를 사용할 경우, SSR 환경에서 Hydration 오류로 인해서 서비스가 심각하게 오동작할 수 있습니다.
 *
 * @example
 * const isMounted = useIsMounted();
 *
 * useEffect(() => {
 *   if (!isMounted) {
 *     return;
 *   }
 *   if (clientBenefitIntelliQuery.data === undefined) {
 *     return;
 *   }
 *   setBenefitIntelliContents(clientBenefitIntelliQuery.data);
 * }, [clientBenefitIntelliQuery.data, isMounted]);
 */
export default function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
