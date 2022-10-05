import Printer from '@seokju.me/browser-thermal-printer';
import { ThermalPrintTxt } from './ThermalPrintTxt';
import { createPrinterFixture, createThermalPrintableContextFixture } from '../testing/fixtures';

describe('ThermalPrintTxt', () => {
  const appendTxt = (printer: Printer, text: string) => {
    printer.setTypeFontA();
    printer.bold(false);
    printer.invert(false);
    printer.underline(false);
    printer.setTextSize(0, 0);
    printer.alignLeft();
    printer.upsideDown(false);
    printer.println(text);
    printer.setTypeFontA();
    printer.bold(false);
    printer.invert(false);
    printer.underline(false);
    printer.setTextSize(0, 0);
    printer.alignLeft();
    printer.upsideDown(false);
    printer.setTextNormal();
  };

  describe('print', () => {
    it('JSX.Element 타입을 문자열로 변환하여 파싱할 수 있다.', () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      const world = 'WORLD';

      ThermalPrintTxt.print(context, <ThermalPrintTxt>hello {world}</ThermalPrintTxt>);
      appendTxt(printer, `hello ${world}`);

      const expected = printer.getBuffer();
      expect(context.printer.getBuffer()).toEqual(expected);
    });

    it('Fragment가 존재하는 children를 잘 파싱할 수 있다.', () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintTxt.print(
        context,
        <ThermalPrintTxt>
          abc <>가나다</> 123
        </ThermalPrintTxt>
      );
      appendTxt(printer, `abc 가나다 123`);

      const expected = printer.getBuffer();
      expect(context.printer.getBuffer()).toEqual(expected);
    });

    it('html 특수문자를 잘 파싱할 수 있다.', () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintTxt.print(
        context,
        <ThermalPrintTxt>
          {`'`}
          {`"`}
          {'<'}
          {'>'}
          안녕하세요
          {`'`}
          {`"`}
          {`<`}
          {`>`}
        </ThermalPrintTxt>
      );
      appendTxt(printer, `'"<>안녕하세요'"<>`);

      const expected = printer.getBuffer();
      expect(context.printer.getBuffer()).toEqual(expected);
    });
  });
});
