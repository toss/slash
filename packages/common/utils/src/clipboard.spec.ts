import { clipboard } from '.';

const originalClipboard = navigator;
const cleared = Symbol('document-navigator-state-mock.clear');

type Navigator = typeof navigator;
type FakeNavigator = { [navigatorKey in keyof Navigator]?: any };

let fakeNavigator: symbol | FakeNavigator | null = null;

// NOTE: taewan
// navigator는 read-only라서 definedProperty로 mock합니다.
Object.defineProperty(window, 'navigator', {
  get: () => {
    return fakeNavigator === cleared ? originalClipboard : fakeNavigator ?? {};
  },
});

function clearNavigator() {
  fakeNavigator = cleared;
}

function mockNavigator(mock: FakeNavigator) {
  fakeNavigator = mock;
}

describe('clipboard', () => {
  afterEach(() => {
    clearNavigator();
  });

  it('should be able to enter text into the clipboard', async () => {
    mockNavigator({
      clipboard: {
        writeText: jest.fn(),
      },
    });

    const spy = jest.spyOn(navigator.clipboard, 'writeText');
    const success = await clipboard.writeText('copy!');
    expect(spy).toHaveBeenCalled();
    expect(success).toBe(true);
  });

  it('should use execCommand instead of writeText in IE', async () => {
    document.queryCommandSupported = jest.fn(command => command === 'copy');
    document.execCommand = jest.fn();

    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'MSIE',
    });

    const spy = jest.spyOn(document, 'execCommand');
    const success = await clipboard.writeText('IE copy!');
    expect(spy).toHaveBeenCalled();
    expect(success).toBe(true);
  });

  it('should execute the catch block in case of failure', async () => {
    mockNavigator({
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error('Clipboard write failed')),
      },
      userAgent: 'user agent',
    });

    document.queryCommandSupported = jest.fn(command => command !== 'copy');

    const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');
    const fail = await clipboard.writeText('copy!');
    expect(writeTextSpy).toHaveBeenCalled();
    expect(fail).toBe(false);
  });
});
