import { render } from '@testing-library/react';
import { Spacing } from './spacing';

describe('Spacing component', () => {
  it('should render a div tag', () => {
    const { container } = render(<Spacing size={40} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render with vertical spacing style', () => {
    const { container } = render(<Spacing size={40} />);

    const spacingStyle = {
      flex: 'none',
      height: '40px',
    };

    expect(container.querySelector('div')).toHaveStyle(spacingStyle);
  });

  it('should render with horizontal spacing style', () => {
    const { container } = render(<Spacing direction="horizontal" size={40} />);

    const spacingStyle = {
      flex: 'none',
      width: '40px',
    };

    expect(container.querySelector('div')).toHaveStyle(spacingStyle);
  });
});
