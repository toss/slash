import { render, cleanup } from '@testing-library/react';
import { createPrinterFixture, createThermalPrintableContextFixture } from '../testing/fixtures';
import { ThermalPrintRow } from './ThermalPrintRow';

describe('ThermalPrintRow', () => {
  afterEach(cleanup);

  it('DOM에 렌더하면 left, right 텍스트가 그려진다.', async () => {
    const fixture = render(<ThermalPrintRow left="left" right="right" />);

    expect(await fixture.findByText('left')).not.toBeNull();
    expect(await fixture.findByText('right')).not.toBeNull();
  });

  describe('print', () => {
    it('왼쪽에 "left", 오른쪽에 "right" 텍스트를 만들고 중간에는 공백으로 채운다.', () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      ThermalPrintRow.print(context, <ThermalPrintRow left="왼쪽" right="오른쪽" />);

      printer.append('왼쪽');
      // '왼쪽' -> 4 (euc-kr 인코딩)
      // '오른쪽' -> 6 (euc-kr 인코딩)
      Array(48 - 4 - 6)
        .fill(undefined)
        .forEach(() => {
          printer.append(Buffer.from(' '));
        });
      printer.append('오른쪽');
      printer.newLine();

      expect(context.printer.getBuffer()).toEqual(printer.getBuffer());
    });
  });
});
