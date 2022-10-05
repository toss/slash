/** @jsxImportSource react */
import { Fragment } from 'react';

/**
 * @description
 * 개행(`\n`)을 `<br />` 으로 바꾸어주는 util 함수입니다.
 *
 * @example
 * <Dialog.Title>{convertNewlineToJSX('로그인 시도 중 문제가 발생했습니다.\n다시 시도해 주세요.')}</Dialog.Title>
 */
export default function convertNewlineToJSX(str: string) {
  const chunks = str.replace(/\\n/g, '\n').split('\n');

  return chunks.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : ''}
      {line}
    </Fragment>
  ));
}
