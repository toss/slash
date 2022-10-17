/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { CSSProperties, forwardRef, ReactElement, Ref } from 'react';
import type { AsProps, InferenceHTMLElement } from './types';
export interface FlexOptions {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
}

/**
 * @name flex
 * @description flex 스타일링을 위한 유틸리티
 *
 * ```ts
 * function flex(options: FlexOptions): SerializedStyles;
 * function flex(
 *   align: CSSProperties['alignItems'],
 *   justify?: CSSProperties['justifyContent'],
 *   direction?: CSSProperties['flexDirection'],
 * ): SerializedStyles;
 * ```
 *
 * @example
 * const MyButton = styled.button`
 *   width: 50px;
 *   height: 50px;
 *   background-color: rgb(249, 250, 251, 0.6);
 *   ${flex({ justify: 'center', align: 'center' })};
 * `;
 *
 * const MyButton2 = styled.button`
 *   width: 50px;
 *   height: 50px;
 *   background-color: rgb(249, 250, 251, 0.6);
 *   ${flex('center', 'center')};
 * `;
 */
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

interface FlexProps<T extends keyof JSX.IntrinsicElements = 'div'> extends AsProps<T>, FlexOptions {}

type FlexReturnType = <T extends keyof JSX.IntrinsicElements = 'div'>(
  props: FlexProps<T> & { ref?: Ref<InferenceHTMLElement<T>> }
) => ReactElement | null;

export const BaseFlex = forwardRef<HTMLElement, FlexProps>(function BaseFlex(props, ref) {
  const { align = 'stretch', as = 'div', direction = 'row', justify = 'flex-start', ...rest } = props;

  const Component = as as any;

  return <Component ref={ref} css={flex({ align, direction, justify })} {...rest} />;
}) as FlexReturnType;

type FlexType = typeof BaseFlex & {
  Center: typeof BaseFlex;
  CenterVertical: typeof BaseFlex;
  CenterHorizontal: typeof BaseFlex;
};

export const Flex = BaseFlex as FlexType;

Flex.Center = forwardRef<HTMLElement, FlexProps<keyof JSX.IntrinsicElements>>(function Center(props, ref) {
  return <BaseFlex align="center" justify="center" {...props} ref={ref} />;
});

Flex.CenterVertical = forwardRef<HTMLElement, FlexProps<keyof JSX.IntrinsicElements>>(function CenterVertical(
  props,
  ref
) {
  return <BaseFlex align="center" {...props} ref={ref} />;
});

Flex.CenterHorizontal = forwardRef<HTMLElement, FlexProps<keyof JSX.IntrinsicElements>>(function CenterHorizontal(
  props,
  ref
) {
  return <BaseFlex justify="center" {...props} ref={ref} />;
});
