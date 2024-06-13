/** @tossdocs-ignore */
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef, ReactElement } from 'react';

type ScreenReaderOnlyProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const ScreenReaderOnly: <C extends ElementType = 'span'>(
  screenReaderOnlyProps: ScreenReaderOnlyProps<C> & {
    ref?: ComponentPropsWithRef<C>['ref'];
  }
) => ReactElement | null = forwardRef(
  <T extends ElementType = 'span'>(
    { as, ...props }: ScreenReaderOnlyProps<T>,
    ref: ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'span';

    return (
      <Component
        {...props}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          borderWidth: 0,
          clip: 'rect(0 0 0 0)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          ...props.style,
        }}
        ref={ref}
      />
    );
  }
);

export default ScreenReaderOnly;
