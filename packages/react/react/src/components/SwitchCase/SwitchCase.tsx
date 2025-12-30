interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value: Case | null;
  defaultComponent?: JSX.Element | null;
}

/** @tossdocs-ignore */
export function SwitchCase<Case extends string | number>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
