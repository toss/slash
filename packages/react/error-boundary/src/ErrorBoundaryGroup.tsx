/** @tossdocs-ignore */
import {
  ComponentPropsWithoutRef,
  ComponentType,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useIsMounted, useKey } from './hooks';

export const ErrorBoundaryGroupContext = createContext({ resetKey: {}, reset: () => {} });
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
  const blockOutsideRef = useRef(blockOutside);
  const isMounted = useIsMounted();
  const group = useContext(ErrorBoundaryGroupContext);
  const [resetKey, reset] = useKey();

  useEffect(() => {
    if (isMounted && !blockOutsideRef.current) {
      reset();
    }
  }, [group.resetKey, isMounted, reset]);

  const value = useMemo(() => ({ reset, resetKey }), [reset, resetKey]);

  return <ErrorBoundaryGroupContext.Provider value={value}>{children}</ErrorBoundaryGroupContext.Provider>;
};

export const useErrorBoundaryGroup = () => {
  const { reset } = useContext(ErrorBoundaryGroupContext);

  return { reset };
};

export const withErrorBoundaryGroup =
  <P extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<P>,
    errorBoundaryGroupProps?: Omit<ComponentPropsWithoutRef<typeof ErrorBoundaryGroup>, 'children'>
  ) =>
  (props: P) =>
    (
      <ErrorBoundaryGroup {...errorBoundaryGroupProps}>
        <Component {...props} />
      </ErrorBoundaryGroup>
    );
