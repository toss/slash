import { useEventCallback } from 'rxjs-hooks';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, merge, Observable, of } from 'rxjs';
import produce, { castDraft } from 'immer';

export enum AsyncStatus {
  Idle = 'IDLE',
  Success = 'SUCCESS',
  Error = 'Error',
  Loading = 'LOADING',
}

interface State<R> {
  data: null | R;
  error: null | any;
  status: AsyncStatus;
}

/**
 * @description
 * 비동기 함수를 인자로 넘기면 넘긴 함수를 호출할 수 있는 callback 함수와 응답값(data), 결과(status), 오류(error)를 사용할 수 있습니다.
 *
 * ```tsx
 * import { useAsyncStateCallback, AsyncStatus } from '@tossteam/react-rx';
 *
 * const [
 *   // 비동기함수의 콜백함수
 *   fetchUser,
 *   {
 *     // 응답값 ( null | R )
 *     data: userData,
 *     // 결과 ( 'IDLE' | 'SUCCESS' | 'Error' | 'LOADING' )
 *     status: userStatus,
 *     // 오류 ( null | any )
 *     error: userError,
 *   },
 * ] = useAsyncStateCallback(async (params: { id: number }) => getUser(params));
 *
 * useEffect(() => fetchUser({ id: userId }));
 *
 * if (userStatus === AsyncStatus.Loading) {
 *   return <FullScreenLoader />;
 * }
 *
 * <Button onClick={() => fetchUser({ id: userId })}>유저 요청</Button>;
 * {
 *   userStatus === AsyncStatus.Success ? (
 *     <div>{userData.name}</div>
 *   ) : (
 *     <p>에러가 발생하였습니다 다시 요청해주세요 {userError.message}</p>
 *   );
 * }
 * ```
 */
export function useAsyncStateCallback<P = undefined, R = null>(callback: (params: P) => Promise<R>) {
  return useEventCallback(
    (params$: Observable<P>, state$: Observable<State<R>>) => {
      const init$ = params$.pipe(
        withLatestFrom(state$),
        map(([, state]) =>
          produce(state, draft => {
            draft.status = AsyncStatus.Loading;
          })
        )
      );

      const response$ = params$.pipe(
        switchMap(params => handleRequestEpic(callback(params), state$)),
        catchError((err, source$) => merge(handleErrorEpic(err, state$), source$))
      );

      return merge(init$, response$);
    },
    { data: null, error: null, status: AsyncStatus.Idle }
  );
}

function handleRequestEpic<R>(request: Promise<R>, state$: Observable<State<R>>) {
  return from(request).pipe(
    withLatestFrom(state$),
    map(([data, state]) => {
      return produce(state, draft => {
        draft.status = AsyncStatus.Success;
        draft.error = null;
        draft.data = castDraft(data);
      });
    })
  );
}

function handleErrorEpic<R>(err: any, state$: Observable<State<R>>) {
  return of(err).pipe(
    withLatestFrom(state$),
    map(([err, state]) =>
      produce(state, draft => {
        draft.status = AsyncStatus.Error;
        draft.error = err;
      })
    )
  );
}
