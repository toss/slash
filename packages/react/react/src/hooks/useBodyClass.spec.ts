import { renderHook } from '@testing-library/react';
import { useBodyClass } from './useBodyClass';

const DEFAULT_CLASS_NAME = 'slash';

describe('`useBodyClass`', () => {
  it('should add class when mount', () => {
    renderHook(() => useBodyClass(DEFAULT_CLASS_NAME));
    expect(document.body).toHaveClass(DEFAULT_CLASS_NAME);
  });
  it('should remove class when unmount', () => {
    const { unmount } = renderHook(() => useBodyClass(DEFAULT_CLASS_NAME));
    expect(document.body).toHaveClass(DEFAULT_CLASS_NAME);
    unmount();
    expect(document.body).not.toHaveClass(DEFAULT_CLASS_NAME);
  });
});
