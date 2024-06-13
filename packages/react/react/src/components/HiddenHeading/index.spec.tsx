import { render } from '@testing-library/react';
import { HiddenHeading } from '.';

describe('HiddenHeading', () => {
  it('can be given an id attribute.', () => {
    render(<HiddenHeading id="test-heading">Test</HiddenHeading>);

    const heading = document.getElementById('test-heading');

    expect(heading).toBeInTheDocument();
    expect(heading?.innerHTML).toEqual('Test');
  });

  it('should have the default tag as h1.', () => {
    const { container } = render(<HiddenHeading>Test</HiddenHeading>);

    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('should not have the default tag as h2.', () => {
    const { container } = render(<HiddenHeading>Test</HiddenHeading>);

    expect(container.querySelector('h2')).not.toBeInTheDocument();
  });

  it('should render with the provided "as" tag.', () => {
    const { container } = render(<HiddenHeading as="h3">Test</HiddenHeading>);

    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('should accept a className through the className attribute.', () => {
    const className = 'class-name';
    const { container } = render(<HiddenHeading className={className}>Test</HiddenHeading>);

    expect(container.querySelector('h1')).toHaveClass(className);
  });

  it('should have default styles.', () => {
    const { container } = render(<HiddenHeading as="h3">Test</HiddenHeading>);

    const defaultStyle = `
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      border: 0;
      clip: rect(0, 0, 0, 0);
    `;

    expect(container.querySelector('h3')).toHaveStyle(defaultStyle);
  });
});
