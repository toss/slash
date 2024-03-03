import { setFocusTimeout } from './setFocusTimeout';

describe('setFocusTimeout', () => {
  it('should focus on the input after the specified delay', async () => {
    const input = document.createElement('input');
    document.body.appendChild(input);

    await setFocusTimeout(() => input.focus(), 1000);

    expect(document.activeElement).toBe(input);
    document.body.removeChild(input);
  });
});
