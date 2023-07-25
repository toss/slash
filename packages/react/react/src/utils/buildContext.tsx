import { createContext, ReactNode, useContext, useMemo } from 'react';

type ProviderProps<ContextValuesType> = (ContextValuesType & { children: ReactNode }) | { children: ReactNode };

export function buildContext<ContextValuesType extends object>(
  contextName: string,
  defaultContextValues?: ContextValuesType | null
) {
  const Context = createContext<ContextValuesType | undefined>(defaultContextValues ?? undefined);

  function Provider({ children, ...contextValues }: ProviderProps<ContextValuesType>) {
    const value = useMemo(
      () => (Object.keys(contextValues).length > 0 ? contextValues : null),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [...Object.values(contextValues)]
    ) as ContextValuesType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useInnerContext() {
    const context = useContext(Context);

    if (context != null) {
      return context;
    }

    if (defaultContextValues != null) {
      return defaultContextValues;
    }

    throw new Error(`\`${contextName}Context\` must be used within \`${contextName}Provider\``);
  }

  Provider.displayName = contextName + 'Provider';

  return [Provider, useInnerContext] as const;
}
