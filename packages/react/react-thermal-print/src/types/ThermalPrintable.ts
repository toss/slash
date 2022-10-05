/** @tossdocs-ignore */
import type Printer from '@seokju.me/browser-thermal-printer';
import type { ThermalPrintConfig } from '../components/ThermalPrint';
import { ReactElement } from 'react';

type Encoder = (content: string) => Buffer;

export type ThermalPrintableContext = {
  printer: Printer;
  config: Required<ThermalPrintConfig>;
  encode: Encoder;
};

export type ThermalPrintable<Props = any> = {
  (props: Props): JSX.Element;
  print: (context: ThermalPrintableContext, elem: ReactElement<Props>) => void | Promise<void>;
};

export function isThermalPrintable<Props>(value: unknown): value is ThermalPrintable<Props> {
  return typeof value === 'function' && typeof (value as ThermalPrintable).print === 'function';
}
