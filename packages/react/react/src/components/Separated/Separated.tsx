/** @tossdocs-ignore */
/** @jsxImportSource react */
import { Children, Fragment, isValidElement, PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  with: ReactNode;
  first?: boolean;
  last?: boolean;
}

export function Separated({ children, with: separator, first = false, last = false }: Props) {
  const childrenArray = Children.toArray(children);
  const childrenLength = childrenArray.length;

  return (
    <>
      {first && separator}
      {childrenArray.map((child, index) => (
        <Fragment key={isValidElement(child) ? child.key : index}>
          {child}
          {index + 1 !== childrenLength && separator}
        </Fragment>
      ))}
      {last && separator}
    </>
  );
}
