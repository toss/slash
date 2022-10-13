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

/**
 * @description
 * Element를 Stack처럼 쌓는 방식으로 묶기 위한 레이아웃 컴포넌트.
 *
 * `Stack.Horizontal`을 이용하면 가로로, `Stack.Vertical`을 이용하면 세로로 쌓을 수 있습니다. `gutter` 값으로 요소들 사이의 간격을 지정할 수 있습니다.
 *
 * ```ts
 * function Stack(props: {
 *   // 요소들의 align-items 값
 *   align?: CSSProperties['alignItems'];
 *
 *   // 요소들의 justify-content 값
 *   justify?: CSSProperties['justifyContent'];
 *
 *   // 요소들의 flex-direction 값
 *   // (값: row, column)
 *   direction?: CSSProperties['flexDirection'];
 *
 *   // 요소들 사이의 간격
 *   // @default 24
 *   gutter?: number;
 * }): JSX.Element;
 * const Stack.Vertical: Stack;
 * const Stack.Horizontal: Stack;
 * ```
 *
 * @example
 * <Stack gutter={2} direction="horizontal" align="center">
 *   <Txt color={adaptive.grey800} typography="st8" fontWeight="semibold" textAlign="center">
 *     {content}
 *   </Txt>
 *   <Foo />
 * </Stack>
 *
 * <Stack.Vertical gutter={40}>
 *   <Foo />
 *   <Bar />
 * </Stack.Vertical>
 *
 * <Stack.Horizontal gutter={20}>
 *   <Foo />
 *   <Bar />
 * </Stack.Horizontal>
 */
export const Stack = BaseStack as StackType;

type StackWithDirectionProps = Omit<StackProps<keyof JSX.IntrinsicElements>, 'direction'>;

Stack.Horizontal = forwardRef<HTMLElement, StackWithDirectionProps>(function StackHorizontal(props, ref) {
  return <Stack direction="horizontal" {...props} ref={ref} />;
}) as StackReturnType;

Stack.Vertical = forwardRef<HTMLElement, StackWithDirectionProps>(function StackVertical(props, ref) {
  return <Stack direction="vertical" {...props} ref={ref} />;
}) as StackReturnType;
