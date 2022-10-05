import { render, cleanup } from '@testing-library/react';
import { createPrinterFixture, createThermalPrintableContextFixture } from '../testing/fixtures';
import { ThermalPrintBr } from './ThermalPrintBr';

describe('ThermalPrintBr', () => {
  afterEach(cleanup);

  it('DOM에 렌더하면 <br />이 그려진다.', async () => {
    const fixture = render(<ThermalPrintBr />);

    expect(fixture.container.querySelector('br')).not.toBeNull();
  });

  describe('print', () => {
    it('"newLine"을 실행한다.', () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintBr.print(context, <ThermalPrintBr />);
      printer.newLine();

      expect(context.printer.getBuffer().equals(printer.getBuffer())).toBe(true);
    });
  });
});
