/** @tossdocs-ignore */
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useIsChanged, useKey } from './hooks';

export const ErrorBoundaryGroupContext = createContext<{ reset: () => void; resetKey: number } | undefined>(undefined);
if (process.env.NODE_ENV !== 'production') {
  ErrorBoundaryGroupContext.displayName = 'ErrorBoundaryGroupContext';
}

/**
 * @description ErrorBoundaryGroup is Component to manage multiple ErrorBoundaries
 * @example
 * ```jsx
 * <ErrorBoundaryGroup>
 *   <ErrorBoundaryGroupReset trigger={( group ) => <button onClick={group.reset} />} />
 *   <ErrorBoundary />
 *   <ErrorBoundary />
 * </ErrorBoundaryGroup>
 *
 * const ErrorBoundaryGroupReset = ({ trigger: Trigger }) => {
 *   const group = useErrorBoundaryGroup();
 *
 *   return <Trigger {...group} />;
 * };
 * ```
 */
export const ErrorBoundaryGroup = ({
  blockOutside = false,
  children,
}: {
  /**
   * @description If you use blockOutside as true, ErrorBoundaryGroup will protect multiple ErrorBoundaries as its children from external ErrorBoundaryGroup's resetKey
   * @default false
   */
  blockOutside?: boolean;
  /**
   * @description Use multiple ErrorBoundaries inside of children
   */
  children?: ReactNode;
}) => {
  const [resetKey, reset] = useKey();
  const parentGroup = useContext(ErrorBoundaryGroupContext);
  const isParentGroupResetKeyChanged = useIsChanged(parentGroup?.resetKey);

  useEffect(() => {
    if (!blockOutside && isParentGroupResetKeyChanged) {
      reset();
    }
  }, [isParentGroupResetKeyChanged, reset, blockOutside]);

  const value = useMemo(() => ({ reset, resetKey }), [reset, resetKey]);

  return <ErrorBoundaryGroupContext.Provider value={value}>{children}</ErrorBoundaryGroupContext.Provider>;
};

/**
 * useErrorBoundaryGroup need ErrorBoundaryGroup in parent. if no ErrorBoundaryGroup, this hook will throw Error to prevent that case.
 */
export const useErrorBoundaryGroup = () => {
  const group = useContext(ErrorBoundaryGroupContext);

  if (group === undefined) {
    throw new Error('useErrorBoundaryGroup must be used within an ErrorBoundaryGroup');
  }

  return useMemo(
    () => ({
      /**
       * When you want to reset multiple ErrorBoundaries as children of ErrorBoundaryGroup, You can use this reset
       */
      reset: group.reset,
    }),
    [group.reset]
  );
};
