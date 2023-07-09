import { StyledComponent } from '@emotion/styled';
import { AllHTMLAttributes } from 'react';

type StyledBaseType<P> = StyledComponent<{ tag?: keyof JSX.IntrinsicElements } & P & AllHTMLAttributes<HTMLElement>>;

export function createStyledComponent<P>(
  StyledBase: StyledBaseType<P>
): ({ ...rest }: React.ComponentProps<StyledBaseType<P>>) => React.ReactElement;
export function createStyledComponent<P>(
  StyledBase: StyledBaseType<P>,
  tag: keyof JSX.IntrinsicElements
): {
  [tag in keyof JSX.IntrinsicElements]: ({ ...rest }: React.ComponentProps<StyledBaseType<P>>) => React.ReactElement;
};
export function createStyledComponent<P>(StyledBase: StyledBaseType<P>, tag?: keyof JSX.IntrinsicElements) {
  if (!tag) {
    return ({ ...rest }: React.ComponentProps<typeof StyledBase>) => <StyledBase {...rest} />;
  } else {
    return {
      [tag]: ({ ...rest }: React.ComponentProps<typeof StyledBase>) => <StyledBase tag={tag} {...rest} />,
    };
  }
}
