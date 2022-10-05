import { render, cleanup } from '@testing-library/react';
import { createPrinterFixture, createThermalPrintableContextFixture } from '../testing/fixtures';
import { ThermalPrintLine } from './ThermalPrintLine';

describe('ThermalPrintLine', () => {
  afterEach(cleanup);

  it('DOM에 렌더하면 <hr />이 그려진다.', async () => {
    const fixture = render(<ThermalPrintLine type="single" />);

    expect(fixture.container.querySelector('hr')).not.toBeNull();
  });

  describe('print', () => {
    it(`type="single"이면 가로 길이만큼 '-' 문자를 추가하고, "newLine"를 실행한다.`, () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintLine.print(context, <ThermalPrintLine type="single" />);

      for (let i = 0; i < context.config.width; i++) {
        printer.append(Buffer.from('-'));
      }
      printer.newLine();

      expect(context.printer.getBuffer().equals(printer.getBuffer())).toBe(true);
    });

    it(`type="double"이면 가로 길이만큼 '=' 문자를 추가하고, "newLine"를 실행한다.`, () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintLine.print(context, <ThermalPrintLine type="double" />);

      for (let i = 0; i < context.config.width; i++) {
        printer.append(Buffer.from('='));
      }
      printer.newLine();

      expect(context.printer.getBuffer().equals(printer.getBuffer())).toBe(true);
    });
  });
});
