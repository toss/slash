/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ComponentPropsWithRef, CSSProperties, forwardRef } from 'react';
import { AsProps, StringElementType } from './types';
export interface FlexOptions {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
}

export function flex(options: FlexOptions): SerializedStyles;
export function flex(
  align: CSSProperties['alignItems'],
  justify?: CSSProperties['justifyContent'],
  direction?: CSSProperties['flexDirection'],
  gap?: CSSProperties['gap']
): SerializedStyles;
export function flex(
  alignOrFlexOptions: FlexOptions | CSSProperties['alignItems'],
  justify = 'flex-start',
  direction = 'row',
  gap = 0
) {
  if (typeof alignOrFlexOptions === 'object') {
    const { align = 'stretch', direction = 'row', justify = 'flex-start', gap = 0 } = alignOrFlexOptions;

    return css`
      align-items: ${align};
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
      gap: ${gap};
    `;
  }

  return css`
    align-items: ${alignOrFlexOptions};
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    gap: ${gap};
  `;
}

flex.center = (direction?: FlexOptions['direction']) => flex({ justify: 'center', align: 'center', direction });

export type FlexProps<T extends StringElementType = 'div'> = AsProps<T> & FlexOptions;

type FlexComponentType = <T extends StringElementType = 'div'>(
  props: FlexProps<T> & Partial<Pick<ComponentPropsWithRef<T>, 'ref'>>
) => JSX.Element | null;

const createFlexComponent = (flexOptions?: FlexOptions): FlexComponentType =>
  forwardRef(function Flex<T extends StringElementType>(props: FlexProps<T>, ref: ComponentPropsWithRef<T>['ref']) {
    const {
      as = 'div',
      direction = flexOptions?.direction ?? 'row',
      justify = flexOptions?.justify ?? 'flex-start',
      align = flexOptions?.align ?? 'stretch',
      gap = flexOptions?.gap ?? 0,
      ...rest
    } = props;
    const Component = as;
    return <Component ref={ref} css={flex({ direction, align, justify, gap })} {...rest} />;
  });

type FlexType = FlexComponentType & {
  Center: FlexComponentType;
  CenterVertical: FlexComponentType;
  CenterHorizontal: FlexComponentType;
};

export const Flex = createFlexComponent() as FlexType;
Flex.Center = createFlexComponent({ align: 'center', justify: 'center' });
Flex.CenterVertical = createFlexComponent({ align: 'center' });
Flex.CenterHorizontal = createFlexComponent({ justify: 'center' });
