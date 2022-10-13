/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { coerceCssPixelValue } from './coerceCssPixelValue';
import { CSSPixelValue, ExtendHTMLProps } from './types';

type SpacingProps = ExtendHTMLProps<
  HTMLDivElement,
  {
    children?: never;
    direction?: 'vertical' | 'horizontal';
    size: CSSPixelValue;
  }
>;

/**
 * @descrition Space를 주는 컴포넌트
 * ```ts
 * function Spacing(props: {
 *   children?: never;
 *   // default: 'vertical'
 *   direction?: 'vertical' | 'horizontal';
 *   size: CSSPixelValue;
 * }): JSX.Element;
 * ```
 *
 * @example
 * <Flex css={{ marginTop: -34 }} as="section" direction="column" align="center">
 *   <Spacing size={40} />
 *   <AS충족상태Header 전체조건충족={전체조건충족} />
 *   <Spacing size={24} />
 *   <무응답고객충족상태Details 전체조건충족={전체조건충족} noResponseInfo={exchangeStatusInfo.noResponseInfo} />
 *   <Spacing size={16} />
 *   <연결후24시간경과충족상태Details 전체조건충족={전체조건충족} after24Hour={exchangeStatusInfo.after24Hour} />
 * </Flex>
 */
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
