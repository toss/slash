/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { ComponentProps, Fragment, ReactNode } from 'react';
import { Spacing } from './spacing';

import { SafeArea as SafeAreaCssValues } from './utils/safeArea';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  topBackgroundColor?: string;
  bottomBackgroundColor?: string;
  children: ReactNode;
} & Omit<React.AllHTMLAttributes<keyof JSX.IntrinsicElements>, 'as'>;

export function SafeArea({ topBackgroundColor, bottomBackgroundColor, children, as, ...props }: Props) {
  const Component: any = as === undefined ? Fragment : as;

  return (
    <Component {...props}>
      <SafeArea.Top style={{ backgroundColor: topBackgroundColor }} />
      {children}
      <SafeArea.Bottom style={{ backgroundColor: bottomBackgroundColor }} />
    </Component>
  );
}

SafeArea.Top = function (props: Omit<ComponentProps<typeof Spacing>, 'size'>) {
  return <Spacing size={SafeAreaCssValues.Top} {...props} />;
};

SafeArea.Bottom = function (props: Omit<ComponentProps<typeof Spacing>, 'size'>) {
  return <Spacing size={SafeAreaCssValues.Bottom} {...props} />;
};
