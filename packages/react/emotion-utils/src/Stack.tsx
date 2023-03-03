/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { ComponentPropsWithRef, forwardRef, ReactElement } from 'react';
import { Flex, FlexOptions } from './flex';
import { gutter, GutterOptions } from './gutter';
import { AsProps, StringElementType } from './types';

type StackOptions = Pick<FlexOptions, 'align' | 'justify'> &
  Partial<Pick<GutterOptions, 'direction' | 'selector'>> & {
    gutter?: number;
  };

type StackProps<T extends StringElementType = StringElementType> = AsProps<T> & StackOptions;

type BaseStackType = <T extends StringElementType = StringElementType>(
  props: StackProps<T> & Partial<Pick<ComponentPropsWithRef<T>, 'ref'>>
) => ReactElement | null;

const BaseStack: BaseStackType = forwardRef(function BaseStack<T extends StringElementType = StringElementType>(
  props: StackProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  const { direction = 'vertical', gutter: gutterSpace = 24, as = 'div', selector, ...rest } = props;
  return (
    <Flex
      as={as}
      ref={ref}
      css={gutter(direction, gutterSpace, selector)}
      direction={direction === 'vertical' ? 'column' : 'row'}
      {...rest}
    />
  );
});

export const Stack = BaseStack as typeof BaseStack & {
  Vertical: typeof BaseStack;
  Horizontal: typeof BaseStack;
};

Stack.Horizontal = forwardRef(function StackHorizontal<T extends StringElementType = StringElementType>(
  props: StackProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  return <Stack direction="horizontal" {...props} ref={ref} />;
});

Stack.Vertical = forwardRef(function StackVertical<T extends StringElementType = StringElementType>(
  props: StackProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) {
  return <Stack direction="vertical" {...props} ref={ref} />;
});
