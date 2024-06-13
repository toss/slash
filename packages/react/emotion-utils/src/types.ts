/** @tossdocs-ignore */
import { ComponentPropsWithoutRef, ElementType, HTMLProps } from 'react';

export type ExtendHTMLProps<Elem extends HTMLElement, T> = Omit<HTMLProps<Elem>, keyof T> & T;

export type CSSPixelValue = string | number;

export type AxisDirection = 'vertical' | 'horizontal';

export type InferenceHTMLElement<K extends keyof JSX.IntrinsicElements> = NonNullable<
  Extract<JSX.IntrinsicElements[K]['ref'], React.RefObject<any>>['current']
>;

export type StringElementType = ElementType & string;

export type AsProps<T extends StringElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};
