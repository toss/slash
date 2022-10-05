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

describe('useOverlay는', () => {
  it(`close()의 레퍼런스가 변경되지 않는다.`, async () => {
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

    /**
     * onClose의 레퍼런스가 변경되면, useEffect가 두 번 실행돼서 타임아웃이 한 번 더 발생한다.
     * 이로 인해 handleClose가 두 번 실행되어버리는 경우가 있었음.
     * @see https://tossteam.slack.com/archives/C01G6U4HJ3A/p1644821948595129?thread_ts=1644819563.714499&cid=C01G6U4HJ3A
     * @see https://github.toss.bz/toss/toss-frontend/pull/14869/files#diff-567909b7e8549c16896bd5f3ba275cc4f9d529e7e8dae79b35f0fa3167c2b0a8R20
     **/
    act(() => {
      jest.advanceTimersByTime(closeDuration + 1);
    });

    expect(handleClose).toBeCalledTimes(1);
  });
});
