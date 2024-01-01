import { act, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { useOverlay } from '../useOverlay';
import { renderWithContext } from './utils';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('useOverlay is', () => {
  it(`The reference of close() does not change.`, async () => {
    const closeDuration = 1000;
    const handleClose = jest.fn();

    function TestOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
      useEffect(() => {
        const timeoutID = setTimeout(() => {
          handleClose();
          onClose();
        }, closeDuration);

        return () => clearTimeout(timeoutID);
      }, [onClose]);

      if (open) {
        return <>open</>;
      } else {
        return null;
      }
    }

    function TestComponent() {
      const overlay = useOverlay();

      useEffect(() => {
        overlay.open(({ isOpen, close }) => {
          return <TestOverlay open={isOpen} onClose={close} />;
        });
      }, [overlay]);

      return null;
    }

    renderWithContext(<TestComponent />);

    await waitFor(() => {
      const overlay = screen.getByText('open');
      expect(overlay).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(closeDuration + 1);
    });

    await waitFor(() => {
      const overlay = screen.queryByText('open');
      expect(overlay).toBeNull();
    });

    act(() => {
      jest.advanceTimersByTime(closeDuration + 1);
    });

    expect(handleClose).toBeCalledTimes(1);
  });
});
