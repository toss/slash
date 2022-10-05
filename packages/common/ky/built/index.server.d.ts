/* eslint-disable */

import ky__default from 'ky';
export * from 'ky';
export { default } from 'ky';

/**
 * NOTE(@raon0211):
 * ky-universal은 top-level await을 사용하고 있어서 바로 CJS로 변환할 수 없습니다.
 * 이에 어쩔 수 없이 index.server.ts 파일을 별도로 만들고, ky-universal의 구현을 require() 만 쓰도록 하여 옮겨옵니다.
 *
 * @see https://github.com/sindresorhus/ky-universal/blob/main/index.js#L30
 */
