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

export type BaseFlexType = <T extends StringElementType = StringElementType>(
  props: FlexProps<T> & Partial<Pick<ComponentPropsWithRef<T>, 'ref'>>
) => JSX.Element | null;

export const BaseFlex: BaseFlexType = forwardRef(function BaseFlex<T extends StringElementType = StringElementType>(
  props: FlexProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  const { as = 'div', direction = 'row', justify = 'flex-start', align = 'stretch', ...rest } = props;
  const As = as;
  return <As ref={ref} css={flex({ direction, align, justify })} {...rest} />;
});

type FlexType = typeof BaseFlex & {
  Center: typeof BaseFlex;
  CenterVertical: typeof BaseFlex;
  CenterHorizontal: typeof BaseFlex;
};

export const Flex = BaseFlex as FlexType;

Flex.Center = forwardRef(function Center<T extends StringElementType = StringElementType>(
  props: FlexProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  return <BaseFlex align="center" justify="center" {...props} ref={ref} />;
});

Flex.CenterVertical = forwardRef(function CenterVertical<T extends StringElementType = StringElementType>(
  props: FlexProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  return <BaseFlex align="center" {...props} ref={ref} />;
});

Flex.CenterHorizontal = forwardRef(function CenterHorizontal<T extends StringElementType = StringElementType>(
  props: FlexProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  return <BaseFlex justify="center" {...props} ref={ref} />;
});
