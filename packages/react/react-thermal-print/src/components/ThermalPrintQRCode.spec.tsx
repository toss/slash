import { render, cleanup } from '@testing-library/react';
import { createPrinterFixture, createThermalPrintableContextFixture } from '../testing/fixtures';
import { ThermalPrintQRCode } from './ThermalPrintQRCode';

describe('ThermalPrintQRCode', () => {
  afterEach(cleanup);

  const url = 'https://toss.im';

  it('DOM에 렌더하면 url이 그려진다.', async () => {
    const fixture = render(<ThermalPrintQRCode url={url} />);

    expect(await fixture.findByText(url)).not.toBeNull();
  });

  describe('print', () => {
    it('QR 코드를 생성한다.', () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintQRCode.print(context, <ThermalPrintQRCode cellSize={6} correction="30%" model="MicroQR" url={url} />);
      printer.printQR(url, {
        cellSize: 6,
        correction: 'H',
        model: 3,
      });

      expect(context.printer.getBuffer().equals(printer.getBuffer())).toBe(true);
    });
  });
});
