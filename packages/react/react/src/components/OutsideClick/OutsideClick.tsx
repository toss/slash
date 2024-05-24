import { ComponentProps, ElementType, ReactNode, useState } from 'react';
import { useOutsideClickEffect } from '../../index';

type OutsideClickProp<Tag extends ElementType> = ComponentProps<Tag> & { children: ReactNode } & {
  as?: Tag;
  callback: () => void;
};

export function OutsideClick<E extends HTMLElement = HTMLDivElement, Tag extends ElementType = 'div'>({
  as,
  children,
  callback,
  ...props
}: OutsideClickProp<Tag>) {
  const [element, setElement] = useState<E | null>(null);

  useOutsideClickEffect(element, callback);

  const Component = as || 'div';

  return (
    <Component ref={setElement} {...props}>
      {children}
    </Component>
  );
}
