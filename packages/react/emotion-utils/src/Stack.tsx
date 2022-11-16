/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { ComponentType, forwardRef, ReactElement, Ref } from 'react';
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

export const Stack = BaseStack as typeof BaseStack & {
  Vertical: ComponentType<StackWithDirectionProps>;
  Horizontal: ComponentType<StackWithDirectionProps>;
};

type StackWithDirectionProps = Omit<StackProps<keyof JSX.IntrinsicElements>, 'direction'>;

Stack.Horizontal = forwardRef<HTMLElement, StackWithDirectionProps>(function StackHorizontal(props, ref) {
  return <Stack {...props} direction="horizontal" ref={ref} />;
});

Stack.Vertical = forwardRef<HTMLElement, StackWithDirectionProps>(function StackVertical(props, ref) {
  return <Stack {...props} direction="vertical" ref={ref} />;
});

const Comp = () => {
  return <Stack.Horizontal direction="horizontal"></Stack.Horizontal>;
};

console.log(Comp);
