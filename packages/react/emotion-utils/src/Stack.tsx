/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { ComponentProps, forwardRef, ReactElement, Ref } from 'react';
import { Flex, FlexOptions } from './flex';
import { gutter, GutterOptions } from './gutter';
import { AsProps, AxisDirection, InferenceHTMLElement } from './types';

interface StackProps<T extends keyof JSX.IntrinsicElements = 'div'>
  extends AsProps<T>,
    Omit<FlexOptions, 'direction'>,
    Omit<GutterOptions, 'direction' | 'space'> {
  direction?: AxisDirection;
  gutter?: number;
}

type StackReturnType<O extends string = ''> = <T extends keyof JSX.IntrinsicElements = 'div'>(
  props: Omit<StackProps<T>, O> & { ref?: Ref<InferenceHTMLElement<T>> }
) => ReactElement | null;

const BaseStack = forwardRef<HTMLElement, StackProps>(function BaseStack(props, ref) {
  const { direction = 'vertical', gutter: gutterSpace = 24, as = 'div', selector, ...rest } = props;

  return (
    <Flex
      as={as}
      ref={ref as any}
      css={gutter(direction, gutterSpace, selector)}
      direction={direction === 'vertical' ? 'column' : 'row'}
      {...rest}
    />
  );
}) as StackReturnType;

export const Stack = BaseStack as typeof BaseStack & {
  Vertical: StackReturnType<'direction'>;
  Horizontal: StackReturnType<'direction'>;
};

Stack.Horizontal = forwardRef<HTMLElement, ComponentProps<typeof Stack.Horizontal>>(function StackHorizontal(
  props,
  ref
) {
  return <Stack {...props} direction="horizontal" ref={ref} />;
});

Stack.Vertical = forwardRef<HTMLElement, ComponentProps<typeof Stack.Vertical>>(function StackVertical(props, ref) {
  return <Stack {...props} direction="vertical" ref={ref} />;
});
