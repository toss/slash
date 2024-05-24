import { ComponentProps, ElementType, PropsWithChildren, ReactNode, useState } from 'react';
import { useOutsideClickEffect } from '../../index';

type NonHaveChildElements =
  | 'input'
  | 'textarea'
  | 'img'
  | 'br'
  | 'hr'
  | 'meta'
  | 'link'
  | 'base'
  | 'col'
  | 'embed'
  | 'source'
  | 'track'
  | 'wbr';

type NoChildren<Tag extends ElementType> = Tag extends NonHaveChildElements
  ? { children?: never }
  : { children?: ReactNode };

type AsRequired<Tag extends ElementType> = Tag extends 'div' ? { as?: Tag } : { as: Tag };

type AllowedTagName<Tag extends ElementType> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : HTMLElement;

type OutsideClickProp<Tag extends ElementType> = PropsWithChildren<ComponentProps<Tag>> &
  AsRequired<Tag> &
  NoChildren<Tag> & {
    callback: () => void;
  };

export default function OutsideClick<
  Tag extends ElementType = 'div',
  E extends AllowedTagName<Tag> = AllowedTagName<Tag>
>({ as, children, callback, ...props }: OutsideClickProp<Tag>) {
  const [element, setElement] = useState<E | null>(null);

  useOutsideClickEffect(element, callback);

  const Component = as || 'div';

  return (
    <Component ref={setElement} {...props}>
      {children}
    </Component>
  );
}
