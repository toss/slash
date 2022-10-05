/** @tossdocs-ignore */
import { ReactNode } from 'react';
import { CharacterSet } from '../types/CharacterSet';
import { ThermalPrintTxt } from './ThermalPrintTxt';
import { ThermalPrintBr } from './ThermalPrintBr';
import { ThermalPrintLine } from './ThermalPrintLine';
import { ThermalPrintBarcode } from './ThermalPrintBarcode';
import { ThermalPrintImage } from './ThermalPrintImage';
import { ThermalPrintRow } from './ThermalPrintRow';
import { ThermalPrintQRCode } from './ThermalPrintQRCode';

export type ThermalPrinterType = 'epson' | 'star';

export type ThermalPrintConfig = {
  printerType: ThermalPrinterType;
  /** @default 48 */
  width?: number;
  /** @default 'KOREA' */
  characterSet?: CharacterSet;
  /** @default false */
  removeSpecialCharacters?: boolean;
  /** @default true */
  beep?: boolean;
  /** @default true */
  cut?: boolean;
};

export type ThermalPrintProps = ThermalPrintConfig & {
  children: ReactNode;
};

function ThermalPrint({ children }: ThermalPrintProps) {
  return <>{children}</>;
}

ThermalPrint.Txt = ThermalPrintTxt;
ThermalPrint.Br = ThermalPrintBr;
ThermalPrint.Line = ThermalPrintLine;
ThermalPrint.Barcode = ThermalPrintBarcode;
ThermalPrint.Image = ThermalPrintImage;
ThermalPrint.Row = ThermalPrintRow;
ThermalPrint.QRCode = ThermalPrintQRCode;

export { ThermalPrint };
