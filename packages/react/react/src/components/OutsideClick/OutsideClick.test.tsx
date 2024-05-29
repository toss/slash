import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { OutsideClick } from './OutsideClick';

describe('OutsideClick', () => {
  it('should call the callback when an event occurs outside the component', async () => {
    const onEffect = jest.fn();

    render(
      <>
        <OutsideClick callback={onEffect}>
          <div data-testid="inside">inside</div>
        </OutsideClick>

        <div data-testid="outside">outside</div>
      </>
    );

    await userEvent.click(screen.getByTestId('inside'));
    expect(onEffect).not.toHaveBeenCalled();

    await userEvent.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalledTimes(1);
    });

    document.body.click();

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalledTimes(2);
    });
  });

  it('should not call the callback when an event occurs inside the component', async () => {
    const onEffect = jest.fn();
    render(
      <OutsideClick callback={onEffect}>
        <div data-testid="inside">inside</div>
      </OutsideClick>
    );

    await userEvent.click(screen.getByTestId('inside'));
    expect(onEffect).not.toHaveBeenCalled();
  });

  it('should expose internal DOM element through external ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onEffect = jest.fn();

    render(
      <OutsideClick ref={ref} callback={onEffect}>
        <div data-testid="inside">inside</div>
      </OutsideClick>
    );

    const insideElement = screen.getByTestId('inside');
    expect(ref.current?.contains(insideElement)).toBeTruthy();
  });
});
