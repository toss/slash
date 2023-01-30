/** @tossdocs-ignore */
import { ComponentProps, JSXElementConstructor } from 'react';

export type ComponentPropsWithoutChildren<Component extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  Omit<ComponentProps<Component>, 'children'>;
