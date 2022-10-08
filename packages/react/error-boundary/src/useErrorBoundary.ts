import { useState } from 'react';

/**
 * @name useErrorBoundary
 * @description
 * 가장 가까운 `ErrorBoundary` 에 에러를 전달하기 위해 사용하는 Hook 입니다.
 * ```typescript
 * const throwError = useErrorBoundary();
 *
 * <Button
 *   onClick={() => {
 *     if (someCondition) {
 *       // 가장 가까운 ErrorBoundary에 인자로 넘겨주는 에러를 보여줍니다.
 *       throwError(new Error('에러 발생'));
 *     }
 *   }}
 * />
 * ```
 */
export default function useErrorBoundary<ErrorType extends Error>() {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  return setError;
}
