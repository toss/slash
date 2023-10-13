/** @tossdocs-ignore */
/** @jsxImportSource react */
import { Children, Fragment, isValidElement, PropsWithChildren, ReactNode } from 'react';

type Props = {
  with: ReactNode;
} & PropsWithChildren;

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
