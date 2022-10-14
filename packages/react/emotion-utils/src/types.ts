/** @tossdocs-ignore */
import { AllHTMLAttributes, HTMLProps } from 'react';

export type ExtendHTMLProps<Elem extends HTMLElement, T> = Omit<HTMLProps<Elem>, keyof T> & T;

export type CSSPixelValue = string | number;

export type AxisDirection = 'vertical' | 'horizontal';

export type InferenceHTMLElement<K extends keyof JSX.IntrinsicElements> = NonNullable<
  Extract<JSX.IntrinsicElements[K]['ref'], React.RefObject<any>>['current']
>;
export interface AsProps<T extends keyof JSX.IntrinsicElements> extends AllHTMLAttributes<T> {
  as?: T;
}
