/** @tossdocs-ignore */
/** @jsxImportSource react */
import { Children, Fragment, isValidElement, PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  with: ReactNode;
  first?: boolean;
  last?: boolean;
}

export function Separated({ children, with: separator, first = false, last = false }: Props) {
  const childrenArray = Children.toArray(children).filter(isValidElement);
  const childrenLength = childrenArray.length;

  return (
    <>
      {first && separator}
      {childrenArray.map((child, i) => (
        <Fragment key={i}>
          {child}
          {i + 1 !== childrenLength ? separator : null}
        </Fragment>
      ))}
      {last && separator}
    </>
  );
}
