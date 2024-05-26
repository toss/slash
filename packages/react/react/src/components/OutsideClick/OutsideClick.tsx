import { ComponentProps, ElementType, ForwardedRef, forwardRef, ReactNode, useState } from 'react';
import { useCombinedRefs } from '../../hooks';
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
  : { children: ReactNode };

type TagRequired<Tag extends ElementType> = Tag extends 'div' ? { as?: Tag } : { as: Tag };

type AllowedTagName<Tag extends ElementType> = Tag extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[Tag]
  : HTMLElement;

type OutsideClickProp<Tag extends ElementType> = ComponentProps<Tag> &
  TagRequired<Tag> &
  NoChildren<Tag> & {
    callback: () => void;
  };

function OutsideClick<Tag extends ElementType = 'div'>(
  { as, children, callback, ...props }: OutsideClickProp<Tag>,
  ref: ForwardedRef<any>
) {
  const [element, setElement] = useState<AllowedTagName<Tag> | null>(null);

  useOutsideClickEffect(element, callback);

  const Component = as || 'div';

  return (
    <Component ref={useCombinedRefs(setElement, ref)} {...props}>
      {children}
    </Component>
  );
}

const OutsideClickWithForwardRef = forwardRef(OutsideClick) as typeof OutsideClick;

export { OutsideClickWithForwardRef as OutsideClick };
