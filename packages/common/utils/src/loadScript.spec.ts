import * as deviceModule from './device/isServer';
import { loadScript } from './loadScript';

describe('loadScript', () => {
  it('should immediately resolve with a Promise in a server environment', async () => {
    jest.spyOn(deviceModule, 'isServer').mockReturnValue(true);
    await expect(loadScript('test-script.js')).resolves.toBeUndefined();
  });

  it('should immediately resolve with a Promise if the script is already loaded or loading', async () => {
    jest.spyOn(deviceModule, 'isServer').mockReturnValue(false);
    const script = document.createElement('script');
    script.src = 'test-script.js';
    document.body.appendChild(script);
    await expect(loadScript('test-script.js')).resolves.toBeUndefined();
  });

  it('should append a script element to the document body and resolve the Promise on load event', () => {
    jest.spyOn(deviceModule, 'isServer').mockReturnValue(false);
    const source = 'https://example.com/script.js';
    loadScript(source);

    const scriptElement = document.querySelector(`script[src="${source}"]`);
    expect(scriptElement).toBeTruthy();
  });
});
