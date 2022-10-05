/** @tossdocs-ignore */
import { encode } from 'iconv-lite';
import Printer, { PrinterTypes } from '@seokju.me/browser-thermal-printer';
import { ThermalPrintConfig } from '..';

export function createPrinterFixture() {
  const printer = new Printer(PrinterTypes.EPSON, 48, 'KOREA', false);

  return printer;
}

export function createThermalPrintableContextFixture() {
  const config: Required<ThermalPrintConfig> = {
    printerType: 'epson',
    width: 48,
    characterSet: 'KOREA',
    removeSpecialCharacters: false,
    beep: true,
    cut: true,
  };
  const printer = new Printer(PrinterTypes.EPSON, 48, 'KOREA', false);

  return { printer, config, encode: (content: string) => encode(content, 'EUC-KR') };
}
