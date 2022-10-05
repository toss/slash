import Printer, { PrinterTypes } from '@seokju.me/browser-thermal-printer';
import { Fragment } from 'react';

import { ThermalPrint } from './components/ThermalPrint';
import { renderToBuffer } from './renderToBuffer';

describe('renderToBuffer', () => {
  it('렌더한 컴포넌트대로 Buffer를 생성할 수 있다.', async () => {
    const actual = await renderToBuffer(
      <ThermalPrint printerType="epson" characterSet="KOREA">
        <ThermalPrint.Txt align="center">Hello World</ThermalPrint.Txt>
      </ThermalPrint>
    );

    const printer = new Printer(PrinterTypes.EPSON, 48, 'KOREA', false);

    printer.setTypeFontA();
    printer.bold(false);
    printer.invert(false);
    printer.underline(false);
    printer.setTextSize(0, 0);
    printer.alignCenter();
    printer.upsideDown(false);
    printer.println('Hello World');
    printer.setTypeFontA();
    printer.bold(false);
    printer.invert(false);
    printer.underline(false);
    printer.setTextSize(0, 0);
    printer.alignLeft();
    printer.upsideDown(false);
    printer.setTextNormal();
    printer.beep();
    printer.cut();

    const expected = printer.getBuffer();

    expect(actual.equals(expected)).toBe(true);
  });

  it('자식 컴포넌트 중 ThermalPrintable 인터페이스를 구현하고 있지 않다면 무시한다.', async () => {
    const actual = await renderToBuffer(
      <ThermalPrint printerType="epson" characterSet="KOREA">
        <span>무시된다!</span>
      </ThermalPrint>
    );

    const printer = new Printer(PrinterTypes.EPSON, 48, 'KOREA', false);

    printer.beep();
    printer.cut();

    const expected = printer.getBuffer();

    expect(actual.equals(expected)).toBe(true);
  });

  it('<React.Fragment />로 감싸진 자식도 순회가 가능하다.', async () => {
    const actual = await renderToBuffer(
      <ThermalPrint printerType="epson" characterSet="KOREA">
        <>
          {/* ---- 1 ---- */}
          <ThermalPrint.Br />
          <ThermalPrint.Line type="single" />
          {/* ---- 1 ---- */}
          <Fragment>
            {/* ---- 2 ---- */}
            <ThermalPrint.Line type="double" />
            <ThermalPrint.Br />
            {/* ---- 2 ---- */}
          </Fragment>
        </>
      </ThermalPrint>
    );

    const printer = new Printer(PrinterTypes.EPSON, 48, 'KOREA', false);

    /* ---- 1 ---- */
    printer.newLine();
    for (let i = 0; i < 48; i++) {
      printer.append(Buffer.from('-'));
    }
    printer.newLine();

    /* ---- 2 ---- */
    for (let i = 0; i < 48; i++) {
      printer.append(Buffer.from('='));
    }
    printer.newLine();
    printer.newLine();

    printer.beep();
    printer.cut();

    const expected = printer.getBuffer();

    expect(actual.equals(expected)).toBe(true);
  });
});
