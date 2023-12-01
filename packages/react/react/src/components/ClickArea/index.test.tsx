import { render } from '@testing-library/react';
import { ClickArea } from '.';

describe('ClickArea', () => {
  it('should render correctly', () => {
    const result = render(<ClickArea enabled={true}>click</ClickArea>);

    expect(result.getByText('click')).toBeInTheDocument();
  });
  it('should apply enabled class when enabled', () => {
    const result = render(<ClickArea enabled={true}>click</ClickArea>);

    expect(result.getAllByRole('button')[0]).toHaveClass('tossteam-react__click-area__enabled');
  });

  it('should not apply enabled class when not enabled', () => {
    const result = render(<ClickArea enabled={false}>click</ClickArea>);

    expect(result.getAllByRole('button')[0]).not.toHaveClass('tossteam-react__click-area__enabled');
  });

  it('should call onClick when enabled and clicked', () => {
    const onClick = jest.fn();
    const result = render(
      <ClickArea enabled={true} onClick={onClick}>
        click
      </ClickArea>
    );

    result.getAllByRole('button')[0].click();

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call onClick when not enabled and clicked', () => {
    const onClick = jest.fn();
    const result = render(
      <ClickArea enabled={false} onClick={onClick}>
        click
      </ClickArea>
    );

    result.getAllByRole('button')[0].click();

    expect(onClick).not.toHaveBeenCalled();
  });
});
