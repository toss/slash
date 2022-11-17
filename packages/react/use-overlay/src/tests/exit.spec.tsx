import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOverlay } from '../useOverlay';
import { renderWithContext } from './utils';

function TestComponent() {
  const overlay = useOverlay();

  return (
    <div>
      <button onClick={() => overlay.open(() => <div>toss</div>)}>open</button>
      <button onClick={() => overlay.close()}>close</button>
      <button onClick={() => overlay.exit()}>exit</button>
    </div>
  );
}

describe('useOverlay', () => {
  it('should unmount overlay when exit function is called', async () => {
    renderWithContext(<TestComponent />);

    const openButton = screen.getByText('open');
    const closeButton = screen.getByText('close');
    const exitButton = screen.getByText('exit');

    await userEvent.click(openButton);
    expect(screen.getByText('toss')).toBeInTheDocument();

    await userEvent.click(closeButton);
    expect(screen.getByText('toss')).toBeInTheDocument();

    await userEvent.click(exitButton);
    expect(screen.queryByText('toss')).not.toBeInTheDocument();
  });
});
