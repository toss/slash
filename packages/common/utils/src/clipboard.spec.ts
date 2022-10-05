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

describe('clipboard는', () => {
  afterEach(() => {
    clearNavigator();
  });

  test('writeText로 클립보드에 텍스트를 입력할 수 있다.', async () => {
    mockNavigator({
      clipboard: {
        writeText: jest.fn(),
      },
    });

    const spy = jest.spyOn(navigator.clipboard, 'writeText');
    const success = await clipboard.writeText('카피');
    expect(spy).toHaveBeenCalled();
    expect(success).toBe(true);
  });

  test('IE에서는 writeText 대신 execCommand 한다.', async () => {
    document.queryCommandSupported = jest.fn(command => command === 'copy');
    document.execCommand = jest.fn();

    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'MSIE',
    });

    const spy = jest.spyOn(document, 'execCommand');
    const success = await clipboard.writeText('IE 카피');
    expect(spy).toHaveBeenCalled();
    expect(success).toBe(true);
  });
});
