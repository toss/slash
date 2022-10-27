/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { forwardRef, ReactElement, Ref } from 'react';

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

type StackReturnType = <T extends keyof JSX.IntrinsicElements = 'div'>(
  props: StackProps<T> & { ref?: Ref<InferenceHTMLElement<T>> }
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

type StackType = typeof BaseStack & {
  Vertical: typeof BaseStack;
  Horizontal: typeof BaseStack;
};

export const Stack = BaseStack as StackType;

type StackWithDirectionProps = Omit<StackProps<keyof JSX.IntrinsicElements>, 'direction'>;

Stack.Horizontal = forwardRef<HTMLElement, StackWithDirectionProps>(function StackHorizontal(props, ref) {
  return <Stack direction="horizontal" {...props} ref={ref} />;
}) as StackReturnType;

Stack.Vertical = forwardRef<HTMLElement, StackWithDirectionProps>(function StackVertical(props, ref) {
  return <Stack direction="vertical" {...props} ref={ref} />;
}) as StackReturnType;
