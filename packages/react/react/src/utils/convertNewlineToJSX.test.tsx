import { render, screen } from '@testing-library/react';
import React from 'react';
import { convertNewlineToJSX } from './convertNewlineToJSX';

describe('convertNewlineToJSX', () => {
  it('should handle one newline character', () => {
    const input = 'There was a problem trying to sign in.\n please try again.';
    const result = convertNewlineToJSX(input);

    render(<React.Fragment>{result}</React.Fragment>);

    expect(screen.getByText(/There was a problem trying to sign in./s)).toBeInTheDocument();
    expect(screen.getByText(/please try again./s)).toBeInTheDocument();
  });

  it('should handle zero newline characters', () => {
    const input = 'There was a problem trying to sign in. please try again.';
    const result = convertNewlineToJSX(input);

    render(<React.Fragment>{result}</React.Fragment>);

    expect(screen.getByText(/There was a problem trying to sign in. please try again./s)).toBeInTheDocument();
  });

  it('should handle multiple newline characters', () => {
    const input = 'There was a problem\n trying to\n sign in. please\n try again.';
    const result = convertNewlineToJSX(input);

    render(<React.Fragment>{result}</React.Fragment>);

    expect(screen.getByText(/There was a problem/s)).toBeInTheDocument();
    expect(screen.getByText(/trying to/s)).toBeInTheDocument();
    expect(screen.getByText(/sign in. please/s)).toBeInTheDocument();
    expect(screen.getByText(/try again./s)).toBeInTheDocument();
  });
});
