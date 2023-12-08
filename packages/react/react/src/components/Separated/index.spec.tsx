import { render, screen } from '@testing-library/react';
import { Separated } from './Separated';

describe('Separated', () => {
  it('should render children with separator', () => {
    const CHILDREN_COUNT = 10;
    const separator = <span data-testid="separator" />;
    const children = Array.from({ length: CHILDREN_COUNT }, (_, i) => (
      <div key={i} data-testid={i}>
        container_{i}
      </div>
    ));

    render(<Separated with={separator}>{children}</Separated>);

    expect(screen.getAllByText(/container/)).toHaveLength(CHILDREN_COUNT);
    expect(screen.getAllByTestId(/separator/)).toHaveLength(CHILDREN_COUNT - 1);
  });

  it('should not render separator with single child', () => {
    const separator = <span data-testid="separator" />;
    const children = <div data-testid="child">child</div>;

    render(<Separated with={separator}>{children}</Separated>);

    expect(screen.getByTestId(/child/)).toBeInTheDocument();
    expect(screen.queryByTestId(/separator/)).not.toBeInTheDocument();
  });

  it('should not render separator with empty children', () => {
    const separator = <span data-testid="separator" />;

    render(<Separated with={separator} />);

    expect(screen.queryByTestId(/separator/)).not.toBeInTheDocument();
  });
});
