import { scrollRestoration } from './scrollRestoration';

describe('scrollRestoration', () => {
  it('should reset scrollRestoration to its original value after temporarily setting it to manual', async () => {
    Object.defineProperty(window.history, 'scrollRestoration', {
      writable: true,
      value: 'auto',
    });
    const originalScrollRestoration = scrollRestoration.set('auto');

    scrollRestoration.set('manual');
    expect(window.history.scrollRestoration).toBe('manual');

    originalScrollRestoration();
    expect(window.history.scrollRestoration).toBe('auto');
  });

  it('should reset scrollRestoration to its original value after temporarily setting it to auto', async () => {
    Object.defineProperty(window.history, 'scrollRestoration', {
      writable: true,
      value: 'manual',
    });
    const originalScrollRestoration = scrollRestoration.set('manual');

    scrollRestoration.set('auto');
    expect(window.history.scrollRestoration).toBe('auto');

    originalScrollRestoration();
    expect(window.history.scrollRestoration).toBe('manual');
  });

  it('should return a noop function when scrollRestoration is not supported', async () => {
    Object.defineProperty(window.history, 'scrollRestoration', {
      value: undefined,
    });
    const noopTest = scrollRestoration.set('manual');
    expect(typeof noopTest).toBe('function');
  });
});
