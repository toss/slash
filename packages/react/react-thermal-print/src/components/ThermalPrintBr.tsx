/** @tossdocs-ignore */
import { ThermalPrintable } from '../types/ThermalPrintable';

export const ThermalPrintBr: ThermalPrintable = () => {
  return <br />;
};

ThermalPrintBr.print = ({ printer }) => {
  printer.newLine();
};
