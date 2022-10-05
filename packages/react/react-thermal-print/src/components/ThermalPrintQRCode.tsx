/** @tossdocs-ignore */
import { ThermalPrintable } from '../types/ThermalPrintable';

export type ThermalPrintQRCodeCorrection = '7%' | '15%' | '25%' | '30%';

export type ThermalPrintQRCodeModel = 'Model1' | 'Model2' | 'MicroQR';

export type ThermalPrintQRCodeProps = {
  /**
   * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=141
   * @default 3
   */
  cellSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=142
   * @default '15%'
   */
  correction?: ThermalPrintQRCodeCorrection;
  /**
   * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=140
   * @default 'Model2'
   */
  model?: ThermalPrintQRCodeModel;
  url: string;
};

export const ThermalPrintQRCode: ThermalPrintable<ThermalPrintQRCodeProps> = ({ url }) => {
  return <>{url}</>;
};

const correctionMap: Record<ThermalPrintQRCodeCorrection, 'L' | 'M' | 'Q' | 'H'> = {
  '7%': 'L',
  '15%': 'M',
  '25%': 'Q',
  '30%': 'H',
};

const modelMap: Record<ThermalPrintQRCodeModel, number> = {
  Model1: 1,
  Model2: 2,
  MicroQR: 3,
};

ThermalPrintQRCode.print = ({ printer }, elem) => {
  const { cellSize = 3, correction = '15%', model = 'Model2', url } = elem.props;

  printer.printQR(url, {
    cellSize,
    correction: correctionMap[correction],
    model: modelMap[model],
  });
};
