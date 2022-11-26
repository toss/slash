import { ComponentProps, ComponentType, createContext, ReactNode, useContext } from 'react';
import { useKey } from '../hooks';

const ResetKeyContext = createContext({ resetKey: {}, reset: () => {} });
if (process.env.NODE_ENV !== 'production') {
  ResetKeyContext.displayName = 'ResetKeyContext';
}

export const ResetKeyProvider = (props: { children: ReactNode }) => {
  const [resetKey, reset] = useKey();

  return <ResetKeyContext.Provider {...props} value={{ reset, resetKey }} />;
};

export const ResetKeyConsumer = ResetKeyContext.Consumer;

export const useResetKey = () => useContext(ResetKeyContext);

const withResetKeyProviderConsumer =
  <P extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<Parameters<ComponentProps<typeof ResetKeyConsumer>['children']>[0] & P>
  ) =>
  (props: P) =>
    (
      <ResetKeyProvider>
        <ResetKeyConsumer>
          {({ reset, resetKey }) => <Component reset={reset} resetKey={resetKey} {...props} />}
        </ResetKeyConsumer>
      </ResetKeyProvider>
    );

const withResetKeyProvider =
  <P extends Record<string, unknown> = Record<string, never>>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <ResetKeyProvider>
        <Component {...props} />
      </ResetKeyProvider>
    );

const withResetKeyConsumer =
  <P extends Record<string, unknown> = Record<string, never>>(
    Component: ComponentType<Parameters<ComponentProps<typeof ResetKeyConsumer>['children']>[0] & P>
  ) =>
  (props: P) =>
    (
      <ResetKeyConsumer>
        {({ reset, resetKey }) => <Component reset={reset} resetKey={resetKey} {...props} />}
      </ResetKeyConsumer>
    );

export const withResetKey = withResetKeyProviderConsumer as typeof withResetKeyProviderConsumer & {
  Provider: typeof withResetKeyProvider;
  Consumer: typeof withResetKeyConsumer;
};

withResetKey.Provider = withResetKeyProvider;
withResetKey.Consumer = withResetKeyConsumer;
