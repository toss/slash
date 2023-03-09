/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ComponentPropsWithRef, CSSProperties, forwardRef } from 'react';
import { AsProps, StringElementType } from './types';
export interface FlexOptions {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
}

export function flex(options: FlexOptions): SerializedStyles;
export function flex(
  align: CSSProperties['alignItems'],
  justify?: CSSProperties['justifyContent'],
  direction?: CSSProperties['flexDirection']
): SerializedStyles;
export function flex(
  alignOrFlexOptions: FlexOptions | CSSProperties['alignItems'],
  justify = 'flex-start',
  direction = 'row'
) {
  if (typeof alignOrFlexOptions === 'object') {
    const { align = 'stretch', direction = 'row', justify = 'flex-start' } = alignOrFlexOptions;

    return css`
      align-items: ${align};
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
    `;
  }

  return css`
    align-items: ${alignOrFlexOptions};
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
  `;
}

flex.center = (direction?: FlexOptions['direction']) => flex({ justify: 'center', align: 'center', direction });

export type FlexProps<T extends StringElementType = StringElementType> = AsProps<T> & FlexOptions;

type FlexComponentType = <T extends StringElementType = StringElementType>(
  props: FlexProps<T> & Partial<Pick<ComponentPropsWithRef<T>, 'ref'>>
) => JSX.Element | null;

const createFlexComponent = (flexOptions?: FlexOptions): FlexComponentType =>
  forwardRef(function Flex<T extends StringElementType = StringElementType>(
    props: FlexProps<T>,
    ref: ComponentPropsWithRef<T>['ref']
  ) {
    const {
      as = 'div',
      direction = flexOptions?.direction ?? 'row',
      justify = flexOptions?.justify ?? 'flex-start',
      align = flexOptions?.align ?? 'stretch',
      ...rest
    } = props;
    const Component = as;
    return <Component ref={ref} css={flex({ direction, align, justify })} {...rest} />;
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
