import React from 'react';
import { create } from 'react-test-renderer';
import { convertNewlineToJSX } from './convertNewlineToJSX';

describe('convertNewlineToJSX', () => {
  it('개행 문자를 JSX 요소로 변환해야 합니다', () => {
    const input = '로그인 시도 중 문제가 발생했습니다.\n다시 시도해 주세요.';
    const output = [
      <React.Fragment key={0}>로그인 시도 중 문제가 발생했습니다.</React.Fragment>,
      <React.Fragment key={1}>
        <br />
        다시 시도해 주세요.
      </React.Fragment>,
    ];

    const result = convertNewlineToJSX(input);

    result.forEach((element, index) => {
      expect(create(element).toJSON()).toEqual(create(output[index]).toJSON());
    });
  });
});
