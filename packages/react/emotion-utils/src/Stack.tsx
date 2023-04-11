/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { ComponentPropsWithRef, forwardRef } from 'react';
import { Flex, FlexOptions } from './flex';
import { gutter, GutterOptions } from './gutter';
import { AsProps, StringElementType } from './types';

type StackOptions = Pick<FlexOptions, 'align' | 'justify'> &
  Partial<Pick<GutterOptions, 'direction' | 'selector'>> & {
    gutter?: number;
  };

type StackProps<T extends StringElementType = 'div'> = AsProps<T> & StackOptions;

type StackComponentType = <T extends StringElementType = 'div'>(
  props: StackProps<T> & Partial<Pick<ComponentPropsWithRef<T>, 'ref'>>
) => JSX.Element | null;

const createStackComponent = (stackOptions?: StackOptions): StackComponentType =>
  forwardRef(function Stack<T extends StringElementType>(props: StackProps<T>, ref: ComponentPropsWithRef<T>['ref']) {
    const {
      as = 'div',
      direction = stackOptions?.direction ?? 'vertical',
      gutter: gutterSpace = stackOptions?.gutter ?? 24,
      selector = stackOptions?.selector,
      ...rest
    } = props;
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

type StackType = StackComponentType & {
  Vertical: StackComponentType;
  Horizontal: StackComponentType;
};

export const Stack = createStackComponent() as StackType;
Stack.Horizontal = createStackComponent({ direction: 'horizontal' });
Stack.Vertical = createStackComponent({ direction: 'vertical' });
