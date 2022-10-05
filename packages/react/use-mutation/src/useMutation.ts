import { Reducer, useCallback, useMemo, useReducer } from 'react';
import { useLoading } from '@tossteam/use-loading';

interface AsyncState<Data> {
  data?: Data;
  error?: Error;
}

type Action<Data> =
  | { type: 'request' }
  | { type: 'success'; payload: Data }
  | { type: 'failure'; payload: Error }
  | { type: 'reset' };

function reducer<Data>(_: AsyncState<Data>, action: Action<Data>): AsyncState<Data> {
  switch (action.type) {
    case 'request':
      return { data: undefined, error: undefined };
    case 'success':
      return { data: action.payload, error: undefined };
    case 'failure':
      return { data: undefined, error: action.payload };
    case 'reset':
      return { data: undefined, error: undefined };
  }
}

const initialState = {};

interface MutationResponse<Args extends unknown[], Data> extends AsyncState<Data> {
  loading: boolean;
  mutate: (...args: Args) => Promise<Data>;
  reset: () => void;
}

/**
 * @name useMutation
 * @description
 * Promise를 반환하는 함수를 수동으로 트리거했을 때 비동기 상태를 선언적으로 관리할 수 있게 해주는 훅입니다.
 *
 * 일반적으로 사용자의 직접적인 액션이 필요한 POST 요청을 보내는 함수와 함께 사용합니다. GET 요청 등을 사용하는 경우에는 `react-query` 의 `useQuery` 함수를 사용하세요.
 * react-query의 [useMutation](https://tanstack.com/query/v4/docs/reference/useMutation) 함수와 동작이 매우 유사합니다.
 *
 * ```typescript
 * const {
 *   // 해당 비동기 작업이 로딩 상태인지를 나타냅니다.
 *   loading,
 *   // 비동기 작업이 완료된 후 반환되는 데이터입니다.
 *   data,
 *   // 비동기 작업이 실패한 경우의 에러 객체입니다.
 *   error,
 *   // param으로 전달된 promiseFactory를 호출합니다, (...args: Args) => Result
 *   mutate,
 * } = useMutation<Args, Result>(
 *   // Promise를 반환하는 함수, (...args: Args) => Result
 *   promiseFactory
 * );
 *
 * mutate(...args);
 * ```
 *
 * @example
 * function postConfirmation(data: Data): Promise<Result> {
 *   return post.e2e<Result>('/api/sample/confirm', data);
 * }
 *
 * function ConfirmButton({ data }: { data: Data }) {
 *   const { loading, mutate } = useMutation(postConfirmation);
 *
 *   const handleSubmit = useCallback(() => {
 *     const result = await mutate(data);
 *     router.push(`/success?id=${result.id}`);
 *   }, [mutate])
 *
 *   return (
 *     <Button loading={loading} onClick={handleSubmit}>
 *       GoGo
 *     </Button>
 *   )
 * }
 *
 * @deprecated react-query의 useMutation을 사용하세요
 */
export function useMutation<Data>(promiseFactory: () => Promise<Data>): MutationResponse<[], Data>;
export function useMutation<Args extends unknown[], Data>(
  promiseFactory: (...args: Args) => Promise<Data>
): MutationResponse<Args, Data>;
export function useMutation<Args extends unknown[], Data>(
  promiseFactory: (...args: Args) => Promise<Data>
): MutationResponse<Args, Data> {
  const [loading, call] = useLoading();
  const [state, dispatch] = useReducer<Reducer<AsyncState<Data>, Action<Data>>>(reducer, initialState);
  const mutate = useCallback(
    async (...args: Args) => {
      try {
        dispatch({ type: 'request' });
        const data = await call(promiseFactory(...args));
        dispatch({ type: 'success', payload: data });
        return data;
      } catch (e: any) {
        dispatch({ type: 'failure', payload: e });
        throw e;
      }
    },
    [call, promiseFactory]
  );
  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);
  return useMemo(() => ({ ...state, loading, mutate, reset }), [state, loading, mutate, reset]);
}
