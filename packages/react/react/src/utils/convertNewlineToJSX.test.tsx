import { render, screen } from '@testing-library/react';
import React from 'react';
import { convertNewlineToJSX } from './convertNewlineToJSX';

describe('convertNewlineToJSX', () => {
  it('should handle one newline character', () => {
    const input = 'There was a problem trying to sign in.\nplease try again.';
    const result = convertNewlineToJSX(input);

    render(<React.Fragment>{result}</React.Fragment>);
    screen.debug();

    expect(screen.getByText('There was a problem trying to sign in.')).toBeInTheDocument();
    expect(screen.getByText('please try again.')).toBeInTheDocument();
  });

  it('should handle zero newline characters', () => {
    const input = 'There was a problem trying to sign in. please try again.';
    const result = convertNewlineToJSX(input);

    render(<React.Fragment>{result}</React.Fragment>);
    screen.debug();

    expect(screen.getByText('There was a problem trying to sign in. please try again.')).toBeInTheDocument();
  });

  it('should handle multiple newline characters', () => {
    const input = 'There was a problem\ntrying to\nsign in. please\ntry again.';
    const result = convertNewlineToJSX(input);

    render(<React.Fragment>{result}</React.Fragment>);
    screen.debug();

    expect(screen.getByText('There was a problem')).toBeInTheDocument();
    expect(screen.getByText('trying to')).toBeInTheDocument();
    expect(screen.getByText('sign in. please')).toBeInTheDocument();
    expect(screen.getByText('try again.')).toBeInTheDocument();
  });
});
