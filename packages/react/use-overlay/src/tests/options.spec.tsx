import { act, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { useOverlay } from '../useOverlay';
import { renderWithContext } from './utils';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('useOverlay는', () => {
  describe('exitOnUnmount 옵션을', () => {
    const closeDuration = 1000;

    function TestOverlay({ open }: { open: boolean }) {
      if (open) {
        return <>open</>;
      } else {
        return null;
      }
    }

    function OverlayCallerComponent({ exitOnUnmount }: { exitOnUnmount: boolean }) {
      const overlay = useOverlay({ exitOnUnmount });

      useEffect(() => {
        overlay.open(({ isOpen }) => {
          return <TestOverlay open={isOpen} />;
        });
      }, [overlay]);

      return null;
    }

    function TestComponent({ exitOnUnmount }: { exitOnUnmount: boolean }) {
      const [open, setOpen] = useState(true);

      useEffect(() => {
        const timeoutID = setTimeout(() => {
          setOpen(false);
        }, closeDuration);

        return () => clearTimeout(timeoutID);
      }, []);

      return <>{open && <OverlayCallerComponent exitOnUnmount={exitOnUnmount} />}</>;
    }

    it('true로 설정하면 useOverlay를 호출한 컴포넌트가 unmount 될 때 같이 unmount 된다.', async () => {
      renderWithContext(<TestComponent exitOnUnmount={true} />);

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
    });

    it('false로 설정하면 useOverlay를 호출한 컴포넌트가 unmount 되어도 같이 unmount 되지 않는다.', async () => {
      renderWithContext(<TestComponent exitOnUnmount={false} />);

      await waitFor(() => {
        const overlay = screen.getByText('open');
        expect(overlay).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(closeDuration + 1);
      });

      await waitFor(() => {
        const overlay = screen.getByText('open');
        expect(overlay).toBeInTheDocument();
      });
    });
  });
});
