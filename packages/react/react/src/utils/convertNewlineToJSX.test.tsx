import React from 'react';
import { create } from 'react-test-renderer';
import { convertNewlineToJSX } from './convertNewlineToJSX';

describe('convertNewlineToJSX', () => {
  it('converts newline characters into <br /> JSX elements', () => {
    const input = 'There was a problem trying to sign in.\nplease try again.';
    const output = [
      <React.Fragment key={0}>There was a problem trying to sign in.</React.Fragment>,
      <React.Fragment key={1}>
        <br />
        please try again.
      </React.Fragment>,
    ];

    const result = convertNewlineToJSX(input);

    result.forEach((element, index) => {
      expect(create(element).toJSON()).toEqual(create(output[index]).toJSON());
    });
  });
});
