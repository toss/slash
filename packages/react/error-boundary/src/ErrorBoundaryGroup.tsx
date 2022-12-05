import { ComponentType, createContext, ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import { useIsMounted, useKey } from './hooks';

const ErrorBoundaryGroupContext = createContext({ groupResetKey: {}, resetGroup: () => { } });
if (process.env.NODE_ENV !== 'production') {
  ErrorBoundaryGroupContext.displayName = 'ErrorBoundaryGroupContext';
}

const ErrorBoundaryGroupReset = ({ trigger }: { trigger: ComponentType<{ resetGroup: () => void }> }) => {
  const { resetGroup } = useErrorBoundaryGroup();
  const Trigger = trigger;

  return <Trigger resetGroup={resetGroup} />;
};

export const ErrorBoundaryGroup = ({
  blockOutside = false,
  children,
}: {
  blockOutside?: boolean;
  children?: ReactNode;
}) => {
  const blockOutsideRef = useRef(blockOutside);
  const isMounted = useIsMounted();
  const { groupResetKey } = useErrorBoundaryGroup();
  const [resetKey, reset] = useKey();

  useEffect(() => {
    if (isMounted && !blockOutsideRef.current) {
      reset();
    }
  }, [groupResetKey, isMounted, reset]);

  const context = useMemo(() => {
    return { resetGroup: reset, groupResetKey: resetKey }
  }, [reset, resetKey]);

  return (
    <ErrorBoundaryGroupContext.Provider value={context}>
      {children}
    </ErrorBoundaryGroupContext.Provider>
  );
};
ErrorBoundaryGroup.Reset = ErrorBoundaryGroupReset;

export const useErrorBoundaryGroup = () => useContext(ErrorBoundaryGroupContext);

export const withErrorBoundaryGroup =
  <P extends Record<string, unknown> = Record<string, never>>(Component: ComponentType<P>) =>
    (props: P) =>
    (
      <ErrorBoundaryGroup>
        <Component {...props} />
      </ErrorBoundaryGroup>
    );
