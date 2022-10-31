/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { coerceCssPixelValue } from './coerceCssPixelValue';
import { AxisDirection, CSSPixelValue, ExtendHTMLProps } from './types';

type SpacingProps = ExtendHTMLProps<
  HTMLDivElement,
  {
    children?: never;
    direction?: AxisDirection;
    size: CSSPixelValue;
  }
>;

export const Spacing = memo(function Spacing({ direction = 'vertical', size, ...props }: SpacingProps) {
  const { style, ...otherProps } = props;

  return (
    <div
      style={{
        flex: 'none',
        width: direction === 'horizontal' ? coerceCssPixelValue(size) : undefined,
        height: direction === 'vertical' ? coerceCssPixelValue(size) : undefined,
        ...style,
      }}
      {...otherProps}
    />
  );
});
