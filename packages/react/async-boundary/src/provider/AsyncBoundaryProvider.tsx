/** @tossdocs-ignore */
import { createContext, ReactNode, useContext } from 'react';
import { useResetError } from '../hooks/useResetError';

interface AsyncBoundaryProvider {
  resetKey: number;
  reset(): void;
}

const AsyncBoundaryContext = createContext<AsyncBoundaryProvider | null>(null);
if (process.env.NODE_ENV !== 'production') {
  AsyncBoundaryContext.displayName = 'AsyncBoundaryContext';
}

interface Props {
  children: ReactNode;
}

export function AsyncBoundaryProvider({ children }: Props) {
  const [resetKey, reset] = useResetError();

  return <AsyncBoundaryContext.Provider value={{ resetKey, reset }}>{children}</AsyncBoundaryContext.Provider>;
}

export function useAsyncBoundaryContext() {
  return useContext(AsyncBoundaryContext) ?? { resetKey: null, reset: () => {} };
}
