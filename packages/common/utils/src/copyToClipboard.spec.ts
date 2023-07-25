import { copyToClipboard } from '.';

describe('copyToClipboard는', () => {
  test('텍스트를 execCommand로 복사할 수 있다.', () => {
    document.queryCommandSupported = jest.fn(command => command === 'copy');
    document.execCommand = jest.fn();

    const spy = jest.spyOn(document, 'execCommand');
    const success = copyToClipboard(`execCommand('copy')`);
    expect(spy).toHaveBeenCalled();
    expect(success).toBe(true);
  });
});
