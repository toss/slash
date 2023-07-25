/** @jsxImportSource react */
import { Children, Fragment, isValidElement, PropsWithChildren, ReactNode } from 'react';

type Props = {
  with: ReactNode;
} & PropsWithChildren;

/**
 * @name Separated
 * @description
 * List와 ListRow 아이템이 아니지만 요소들 중간에 반복적으로 들어가야 하는 컴포넌트가 있을 시 사용합니다.
 *
 * ```typescript
 * <Separated
 *   // 요소들 중간에 들어갈 컴포넌트 (`ReactNode`)
 *   with={with}
 * >
 *   {children}
 * </Separated>
 * ```
 *
 * @example
 * <Separated with={<Border type="padding24" />}>
 *   {LIST.map(item => <div>item.title</div>)}
 * </Separated>
 */
export function Separated({ children, with: separator }: Props) {
  const childrenArray = Children.toArray(children).filter(isValidElement);
  const childrenLength = childrenArray.length;

  return (
    <>
      {childrenArray.map((child, i) => (
        <Fragment key={i}>
          {child}
          {i + 1 !== childrenLength ? separator : null}
        </Fragment>
      ))}
    </>
  );
}
