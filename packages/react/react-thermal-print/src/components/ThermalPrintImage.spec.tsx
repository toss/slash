import { cleanup, render } from '@testing-library/react';
import assert from 'assert';
import { readFile } from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { createPrinterFixture, createThermalPrintableContextFixture } from '../testing/fixtures';
import { ThermalPrintImage } from './ThermalPrintImage';

const imageSrc = path.resolve(__dirname, '../testing/logo.png');
const src = pathToFileURL(imageSrc).toString();

describe('ThermalPrintImage', () => {
  afterEach(cleanup);

  it('DOM에 렌더시에 <img>를 그린다.', () => {
    const fixture = render(<ThermalPrintImage src={src} />);
    const img = fixture.container.querySelector<HTMLImageElement>('img');

    assert(img != null);
    expect(img.src.endsWith('testing/logo.png')).toBe(true);
  });

  describe('print', () => {
    xit('PNG 파일의 Buffer를 읽어서 채운다.', async () => {
      const printer = createPrinterFixture();
      const context = createThermalPrintableContextFixture();

      await ThermalPrintImage.print(context, <ThermalPrintImage src={src} />);

      const imgBuffer = await readFile(imageSrc);
      await printer.printImageBuffer(imgBuffer);

      expect(context.printer.getBuffer()).toEqual(printer.getBuffer());
    });
  });
});
