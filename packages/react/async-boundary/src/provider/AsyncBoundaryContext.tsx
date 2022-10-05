import { createContext, ReactNode, useContext } from 'react';
import useResetError from '../hooks/useResetError';

interface AsyncBoundaryProvider {
  resetKey: number;
  reset(): void;
}

const AsyncBoundaryContext = createContext<AsyncBoundaryProvider | null>(null);

interface Props {
  children: ReactNode;
}

/**
 * @name AsyncBoundaryProvider
 * @description
 * `AsyncBoundary` 컴포넌트를 사용하면, Error Reset를 하는 부분과 실제 Suspense + ErrorBoundary를 사용하는 부분이 떨어져 있어도
 * `AsyncBoundaryProvider` 를 이용하여 Error Reset을 할 수 있습니다.
 * @example
 * <AsyncBoundaryProvider>
 *   <DataController /> // <-- error reset 해야 하는 부분
 *   <Spacing size={40} />
 *   <AsyncBoundary <-- suspense + error boundary로 감싸져야 하는 부분
 *     pendingFallback={<TableSkeleton title="상세내역" row={10} />}
 *     errorFallback={({ error, reset }) => (
 *       <ErrorAlert
 *         theme="yellow"
 *         error={error}
 *         message="다시 시도해주세요."
 *         onResetError={reset}
 *       />
 *     )}
 *   >
 *    <DataViewer />
 *   </AsyncBoundary>
 * </AsyncBoundaryProvider>
 * @see https://github.com/tosspayments/frontend/pull/955#pullrequestreview-568147010
 */
export function AsyncBoundaryProvider({ children }: Props) {
  const [resetKey, reset] = useResetError();

  return <AsyncBoundaryContext.Provider value={{ resetKey, reset }}>{children}</AsyncBoundaryContext.Provider>;
}

export function useAsyncBoundaryContext() {
  return useContext(AsyncBoundaryContext) ?? { resetKey: null, reset: () => {} };
}
