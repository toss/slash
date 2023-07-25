import { createContext, ReactNode, useContext, useMemo } from 'react';

type ProviderProps<ContextValuesType> = (ContextValuesType & { children: ReactNode }) | { children: ReactNode };

/**
 * @description React Context를 정의할 때 반복되는 코드를 줄여주는 헬퍼 함수입니다.
 * @param contextName 기능을 드러내는 이름이면 좋습니다. context의 정체성을 담당합니다.
 * @param defaultContextValues 기본값을 지정할 수 있습니다.
 * @returns [Provider, useContext]를 반환합니다.
 * @example
 * const [Provider, useContext] = buildContext('TestContext', null);
 *
 * function Inner() {
 *  const context = useContext<{ title: string }>('Inner');
 *
 * return <h1>{context.title}</h1>;
 * }
 *
 * function Page() {
 *  return (
 *    <Provider title="타이틀">
 *      <Inner />
 *    </Provider>
 *  );
 * }
 */
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
