/** @tossdocs-ignore */
import type Printer from '@seokju.me/browser-thermal-printer';
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ThermalPrintable } from '../types/ThermalPrintable';

export type ThermalPrintTxtSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ThermalPrintTxtConfig {
  display?: 'block' | 'inline';
  fontType?: 'A' | 'B';
  bold?: boolean;
  invert?: boolean;
  underline?: boolean;
  doubleWidth?: boolean;
  doubleHeight?: boolean;
  quadArea?: boolean;
  size?: { width: ThermalPrintTxtSize; height: ThermalPrintTxtSize };
  align?: 'left' | 'center' | 'right';
  upsideDown?: boolean;
}

export interface ThermalPrintTxtProps extends ThermalPrintTxtConfig {
  children: ReactNode;
}

export const ThermalPrintTxt: ThermalPrintable<ThermalPrintTxtProps> = ({ children }) => {
  return <span>{children}</span>;
};

const setConfig = (
  printer: Printer,
  {
    fontType = 'A',
    bold = false,
    invert = false,
    underline = false,
    doubleWidth = false,
    doubleHeight = false,
    quadArea = false,
    size = { width: 0, height: 0 },
    align = 'left',
    upsideDown = false,
  }: ThermalPrintTxtConfig = {}
) => {
  switch (fontType) {
    case 'A':
      printer.setTypeFontA();
      break;
    case 'B':
      printer.setTypeFontB();
      break;
  }

  printer.bold(bold);
  printer.invert(invert);
  printer.underline(underline);

  if (doubleWidth) {
    printer.setTextDoubleWidth();
  }
  if (doubleHeight) {
    printer.setTextDoubleHeight();
  }
  if (quadArea) {
    printer.setTextQuadArea();
  }
  printer.setTextSize(size.height, size.width);

  switch (align) {
    case 'left':
      printer.alignLeft();
      break;
    case 'center':
      printer.alignCenter();
      break;
    case 'right':
      printer.alignRight();
      break;
  }

  printer.upsideDown(upsideDown);
};

const resetConfig = (printer: Printer) => {
  setConfig(printer);
  printer.setTextNormal();
};

const replaces = [
  { from: /&quot;/g, to: `"` },
  { from: /&amp;/g, to: `&` },
  { from: /&#x27;/g, to: `'` },
  { from: /&lt;/g, to: `<` },
  { from: /&gt;/g, to: `>` },
];

export const txtChildrenToString = (children: ReactNode): string => {
  let str = renderToStaticMarkup(<>{children}</>);

  replaces.forEach(({ from, to }) => {
    str = str.replace(from, to);
  });

  return str;
};

ThermalPrintTxt.print = ({ printer }, elem) => {
  const { children, ...config } = elem.props;
  const display = config.display ?? 'block';
  const text = txtChildrenToString(children);

  setConfig(printer, config);
  display === 'block' ? printer.println(text) : printer.print(text);
  resetConfig(printer);
};
