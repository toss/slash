/** @tossdocs-ignore */
import { ThermalPrintable } from '../types/ThermalPrintable';

export type ThermalPrintLineType = 'single' | 'double';

export type ThermalPrintLineProps = {
  type: ThermalPrintLineType;
};

export const ThermalPrintLine: ThermalPrintable<ThermalPrintLineProps> = () => {
  return <hr />;
};

const lineCharacters: Record<ThermalPrintLineType, string> = {
  single: '-',
  double: '=',
};

ThermalPrintLine.print = ({ printer, config }, elem) => {
  for (let i = 0; i < config.width; i++) {
    printer.append(Buffer.from(lineCharacters[elem.props.type]));
  }
  printer.newLine();
};
