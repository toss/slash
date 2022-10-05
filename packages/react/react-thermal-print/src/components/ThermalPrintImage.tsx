/** @tossdocs-ignore */
import { ThermalPrintable } from '../types/ThermalPrintable';

export type ThermalPrintImageProps = {
  src: string;
};

export const ThermalPrintImage: ThermalPrintable<ThermalPrintImageProps> = ({ src }) => {
  return <img src={src} />;
};

ThermalPrintImage.print = async ({ printer }, elem) => {
  const { src } = elem.props;

  await printer.printImage(src);
};
