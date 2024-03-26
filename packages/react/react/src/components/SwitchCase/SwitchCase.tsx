type EnumKeys<E> = E extends Record<infer K, number | string> ? K : never;

interface Props<Case extends string | number | EnumKeys<any>> {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value: Case;
  defaultComponent?: JSX.Element | null;
}

export function SwitchCase<Case extends string | number | EnumKeys<any>>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
