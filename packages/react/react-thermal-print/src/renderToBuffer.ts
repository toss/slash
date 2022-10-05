/** @tossdocs-ignore */
import Printer, { PrinterTypes } from '@seokju.me/browser-thermal-printer';
import { Children, ComponentProps, isValidElement, ReactElement, ReactNode } from 'react';
import { ThermalPrint } from './components/ThermalPrint';
import { isThermalPrintable, ThermalPrintableContext } from './types/ThermalPrintable';

type ThermalPrintProps = ComponentProps<typeof ThermalPrint>;

const printerTypesMap: Record<ThermalPrintProps['printerType'], PrinterTypes> = {
  epson: PrinterTypes.EPSON,
  star: PrinterTypes.STAR,
};

async function printAll(context: ThermalPrintableContext, node: ReactNode) {
  const childrenArr = Children.toArray(node);

  for (const child of childrenArr) {
    if (!isValidElement(child)) {
      continue;
    }

    if (isThermalPrintable(child.type)) {
      await child.type.print(context, child);
    } else {
      await printAll(context, child.props.children);
    }
  }
}

export async function renderToBuffer(elem: ReactElement<ThermalPrintProps>) {
  const {
    printerType,
    width = 48,
    characterSet = 'KOREA',
    removeSpecialCharacters = false,
    beep = true,
    cut = true,
    children,
  } = elem.props;

  const config = {
    printerType,
    width,
    characterSet,
    removeSpecialCharacters,
    beep,
    cut,
  };

  const printer = new Printer(printerTypesMap[printerType], width, characterSet, removeSpecialCharacters);

  const { encode } = await import('iconv-lite');
  const encoding = printer.printer.codePage[characterSet]!;

  await printAll(
    {
      printer,
      config,
      encode: content => encode(content, encoding),
    },
    children
  );

  if (beep) {
    printer.beep();
  }

  if (cut) {
    printer.cut();
  }

  return printer.getBuffer();
}
