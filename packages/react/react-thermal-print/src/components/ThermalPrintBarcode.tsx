/** @tossdocs-ignore */
import { ThermalPrintable } from '../types/ThermalPrintable';

// https://github.com/Klemen1337/node-thermal-printer/blob/04f13b9a6990832b73fa85381bf9553b84371f3c/README.md#epson-barcode-reference
export type ThermalPrintBarcodeType =
  | 'Epson/UPC-A'
  | 'Epson/UPC-E'
  | 'Epson/JAN13'
  | 'Epson/JAN8'
  | 'Epson/Code39'
  | 'Epson/ITF'
  | 'Epson/CODABAR (NW-7)'
  | 'Epson/CODE93'
  | 'Epson/CODE128'
  | 'Epson/GS1-128'
  | 'Epson/GS1 DataBar Omnidirectional'
  | 'Epson/GS1 DataBar Truncated'
  | 'Epson/GS1 DataBar Limited'
  | 'Epson/GS1 DataBar Expanded'
  | 'Star/UPC-E'
  | 'Star/UPC-A'
  | 'Star/JAN (EAN8)'
  | 'Star/JAN (EAN13)'
  | 'Star/Code39'
  | 'Star/ITF'
  | 'Star/CODE128'
  | 'Star/CODE93'
  | 'Star/NW-7';

export type ThermalPrintBarcodeHriPosition = 'none' | 'top' | 'bottom' | 'top/bottom';

export type ThermalPrintBarcodeProps = {
  type: ThermalPrintBarcodeType;
  /** @default 'none' */
  hriPosition?: ThermalPrintBarcodeHriPosition;
  /**
   * 0, 1은 항상 지원됨. 나머지 값은 프린터에 따라 다름
   * @default 0
   */
  hriFont?: 0 | 1 | 2 | 3 | 4 | 48 | 49 | 50 | 51 | 52 | 97 | 98;
  /** @default 3 */
  width?: 2 | 3 | 4 | 5 | 6;
  /**
   * 1~255
   * @default 162
   */
  height?: number;
  children: string;
};

export const ThermalPrintBarcode: ThermalPrintable<ThermalPrintBarcodeProps> = ({ children }) => {
  return <>{children}</>;
};

const typeMap: Record<ThermalPrintBarcodeType, string> = {
  'Epson/UPC-A': '65',
  'Epson/UPC-E': '66',
  'Epson/JAN13': '67',
  'Epson/JAN8': '68',
  'Epson/Code39': '69',
  'Epson/ITF': '70',
  'Epson/CODABAR (NW-7)': '71',
  'Epson/CODE93': '72',
  'Epson/CODE128': '73',
  'Epson/GS1-128': '74',
  'Epson/GS1 DataBar Omnidirectional': '75',
  'Epson/GS1 DataBar Truncated': '76',
  'Epson/GS1 DataBar Limited': '77',
  'Epson/GS1 DataBar Expanded': '78',
  'Star/UPC-E': '0',
  'Star/UPC-A': '1',
  'Star/JAN (EAN8)': '2',
  'Star/JAN (EAN13)': '3',
  'Star/Code39': '4',
  'Star/ITF': '5',
  'Star/CODE128': '6',
  'Star/CODE93': '7',
  'Star/NW-7': '8',
};

const hriPositionMap: Record<ThermalPrintBarcodeHriPosition, number> = {
  none: 0,
  top: 1,
  bottom: 2,
  'top/bottom': 3,
};

ThermalPrintBarcode.print = ({ printer }, elem) => {
  const { type, hriPosition = 'none', hriFont = 0, width = 3, height = 162, children } = elem.props;

  printer.printBarcode(children, typeMap[type], {
    hriPos: hriPositionMap[hriPosition],
    hriFont,
    width,
    height,
  });
};
