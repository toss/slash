interface Props<Case extends string> {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value: Case;
  defaultComponent?: JSX.Element | null;
}

/** @tossdocs-ignore */
export function SwitchCase<Case extends string>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
