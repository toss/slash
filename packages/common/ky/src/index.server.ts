/** @tossdocs-ignore */
/*
 * NOTE(@raon0211):
 * ky-universal은 top-level await을 사용하고 있어서 바로 CJS로 변환할 수 없습니다.
 * 이에 어쩔 수 없이 index.server.ts 파일을 별도로 만들고, ky-universal의 구현을 require() 만 쓰도록 하여 옮겨옵니다.
 *
 * @see https://github.com/sindresorhus/ky-universal/blob/main/index.js#L30
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import fetch, { Headers, Request, Response } from 'node-fetch';
import AbortController from 'abort-controller';
// @ts-ignore
import ky from 'ky';

const TEN_MEGABYTES = 1000 * 1000 * 10;

if (!globalThis.fetch) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.fetch = (url, options) => fetch(url, { highWaterMark: TEN_MEGABYTES, ...options });
}

if (!globalThis.Headers) {
  globalThis.Headers = Headers;
}

if (!globalThis.Request) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.Request = Request;
}

if (!globalThis.Response) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.Response = Response;
}

if (!globalThis.AbortController) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.AbortController = AbortController;
}

if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = require('web-streams-polyfill/ponyfill/es6');
}

export default ky;
// @ts-ignore
export * from 'ky';
