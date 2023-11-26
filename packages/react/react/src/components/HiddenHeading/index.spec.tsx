import { render } from '@testing-library/react';
import { HiddenHeading } from '.';

describe('HiddenHeading', () => {
  it('should provide an id.', () => {
    render(<HiddenHeading id="test-heading">Test</HiddenHeading>);

    const heading = document.getElementById('test-heading');

    expect(heading).toBeInTheDocument();
    expect(heading?.innerHTML).toEqual('Test');
  });

  it('HiddenHeading의 as의 기본값은 h1이다.', () => {
    const { container } = render(<HiddenHeading>Test</HiddenHeading>);

    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('HiddenHeading의 as의 기본값은 h2가 아니다.', () => {
    const { container } = render(<HiddenHeading>Test</HiddenHeading>);

    expect(container.querySelector('h2')).not.toBeInTheDocument();
  });

  it('HiddenHeading의 as를 통해 as의 태그로 렌더링된다', () => {
    const { container } = render(<HiddenHeading as="h3">Test</HiddenHeading>);

    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('HiddenHeading의 className 속성을 통해 className을 줄 수 있다.', () => {
    const className = 'class-name';
    const { container } = render(<HiddenHeading className={className}>Test</HiddenHeading>);

    expect(container.querySelector('h1')).toHaveClass(className);
  });

  it('HiddenHeading은 default style을 가진다.', () => {
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
