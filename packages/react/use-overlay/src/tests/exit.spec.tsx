import { act, screen, waitFor } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useOverlay } from '../useOverlay';
import { renderWithContext } from './utils';

const closeDuration = 1000;

function OverlayCallerComponent() {
  const overlay = useOverlay();

  useEffect(() => {
    overlay.open(() => {
      return <div>toss</div>;
    });

    const timeoutID = setTimeout(() => {
      overlay.exit();
    }, closeDuration);

    return () => clearTimeout(timeoutID);
  }, [overlay]);

  return null;
}

describe('useOverlay', () => {
  it('should unmount overlay when exit function is called', async () => {
    renderWithContext(<OverlayCallerComponent />);

    const overlay = screen.getByText('toss');
    expect(overlay).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(closeDuration + 1);
    });

    await waitFor(() => {
      const overlay = screen.queryByText('toss');
      expect(overlay).toBeNull();
    });
  });
});
