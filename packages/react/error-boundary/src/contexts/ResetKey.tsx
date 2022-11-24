import {
  ComponentProps,
  ComponentType,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

const ResetKeyContext = createContext<{ resetKey: number; reset: () => void }>({ resetKey: 0, reset: () => {} });
if (process.env.NODE_ENV !== 'production') {
  ResetKeyContext.displayName = 'ResetKeyContext';
}

export const ResetKeyProvider = ({ children }: PropsWithChildren) => {
  const [resetKey, setResetKey] = useState(0);
  const reset = useCallback(() => setResetKey(prev => prev + 1), []);

  return <ResetKeyContext.Provider value={{ resetKey, reset }}>{children}</ResetKeyContext.Provider>;
};

export const ResetKeyConsumer = (props: { children: ComponentProps<typeof ResetKeyContext.Consumer>['children'] }) => (
  <ResetKeyContext.Consumer {...props} />
);

export const useResetKey = () => useContext(ResetKeyContext);

export const withResetKey =
  <P extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<ReturnType<typeof useResetKey> & P>
  ) =>
  (props: P) =>
    (
      <ResetKeyProvider>
        <ResetKeyConsumer>
          {({ reset, resetKey }) => <Component reset={reset} resetKey={resetKey} {...props} />}
        </ResetKeyConsumer>
      </ResetKeyProvider>
    );
