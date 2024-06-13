import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClickArea } from '.';

describe('ClickArea', () => {
  const ENABLED_CLASS_NAME = 'tossteam-react__click-area__enabled';

  it('should render correctly', () => {
    const result = render(<ClickArea>click</ClickArea>);
    expect(result.getByRole('button')).toHaveTextContent('click');
  });

  it('should apply enabled class when enabled', () => {
    const result = render(<ClickArea enabled>click</ClickArea>);
    expect(result.getByRole('button')).toHaveClass(ENABLED_CLASS_NAME);
  });

  it('should not apply enabled class when not enabled', () => {
    const result = render(<ClickArea enabled={false}>click</ClickArea>);
    expect(result.getByRole('button')).not.toHaveClass(ENABLED_CLASS_NAME);
  });

  it('should call onClick when enabled and clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const result = render(<ClickArea onClick={onClick}>click</ClickArea>);

    await user.click(result.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when not enabled and clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const result = render(
      <ClickArea enabled={false} onClick={onClick}>
        click
      </ClickArea>
    );

    await user.click(result.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
