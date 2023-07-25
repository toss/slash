/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery as useTossQuery } from './useQuery';

const noop = () => {};

const useQuery = noop as any as typeof useTossQuery;

describe('useQuery', () => {
  it('undefined를 반환하는 함수에 대해서는 에러가 발생한다', () => {
    // @ts-expect-error
    useQuery(['key'], () => undefined).data;

    // @ts-expect-error
    useQuery(['key'], () => Promise.resolve(undefined)).data;

    async function functionReturningVoid() {
      return;
    }

    // @ts-expect-error
    useQuery(['key'], functionReturningVoid).data;

    async function functionReturningUndefined() {
      return undefined;
    }

    // @ts-expect-error
    useQuery(['key'], functionReturningUndefined).data;
  });

  it('null이나 다른 값을 반환할 수 있다.', () => {
    async function functionReturningNull() {
      return null;
    }

    useQuery(['key'], functionReturningNull).data;

    async function functionReturningObject() {
      return null;
    }

    useQuery(['key'], functionReturningObject).data;
  });
});
