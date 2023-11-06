import { render, screen } from '@testing-library/react';
import { convertNewlineToJSX } from './convertNewlineToJSX';

describe('convertNewlineToJSX', () => {
  it('should handle one newline characters', () => {
    const input = 'There was a problem trying to sign in.\nplease try again.';
    const result = convertNewlineToJSX(input);

    render(<>{result}</>);
    screen.debug();

    expect(screen.getByText('There was a problem trying to sign in.<br/>please try again.')).toBeInTheDocument();
  });

  it('should handle zero newline characters', () => {
    const input = 'There was a problem trying to sign in. please try again.';
    const result = convertNewlineToJSX(input);

    render(<>{result}</>);
    screen.debug();

    expect(screen.getByText('There was a problem trying to sign in. please try again.')).toBeInTheDocument();
  });

  it('should handle multiple newline characters', () => {
    const input = 'There was a problem \ntrying to\n sign in. please\ntry again.';
    const result = convertNewlineToJSX(input);

    render(<>{result}</>);
    screen.debug();

    expect(
      screen.getByText('There was a problem <br/>trying to<br/> sign in. please<br/>try again.')
    ).toBeInTheDocument();
  });
});
