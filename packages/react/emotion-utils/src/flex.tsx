/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ComponentProps, CSSProperties, forwardRef, ReactElement, Ref } from 'react';
import type { AsProps, InferenceHTMLElement } from './types';
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

interface FlexProps<T extends keyof JSX.IntrinsicElements = 'div'> extends AsProps<T>, FlexOptions {}

type FlexReturnType<O extends string = ''> = <T extends keyof JSX.IntrinsicElements = 'div'>(
  props: Omit<FlexProps<T>, O> & { ref?: Ref<InferenceHTMLElement<T>> }
) => ReactElement | null;

export const BaseFlex = forwardRef<HTMLElement, FlexProps>(function BaseFlex(props, ref) {
  const { align = 'stretch', as = 'div', direction = 'row', justify = 'flex-start', ...rest } = props;

  const Component = as as any;

  return <Component ref={ref} css={flex({ align, direction, justify })} {...rest} />;
}) as FlexReturnType;

type FlexType = typeof BaseFlex & {
  Center: FlexReturnType<'align' | 'center'>;
  CenterVertical: FlexReturnType<'align'>;
  CenterHorizontal: FlexReturnType<'align'>;
};

export const Flex = BaseFlex as FlexType;

Flex.Center = forwardRef<HTMLElement, ComponentProps<typeof Flex.Center>>(function Center(props, ref) {
  return <BaseFlex {...props} align="center" justify="center" ref={ref} />;
});

Flex.CenterVertical = forwardRef<HTMLElement, ComponentProps<typeof Flex.CenterVertical>>(function CenterVertical(
  props,
  ref
) {
  return <BaseFlex {...props} align="center" ref={ref} />;
});

Flex.CenterHorizontal = forwardRef<HTMLElement, ComponentProps<typeof Flex.CenterHorizontal>>(function CenterHorizontal(
  props,
  ref
) {
  return <BaseFlex {...props} justify="center" ref={ref} />;
});
