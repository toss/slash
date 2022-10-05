import { EMPTY, from, timer } from 'rxjs';
import { catchError, exhaustMap, map, retry, switchMap } from 'rxjs/operators';
import axios from 'axios';

interface Params {
  tickInterval?: number;
  fetchInterval?: number;
  retry?: number;
}

/**
 * @description
 * 서버시간을 가져올 수 있는 observalbes 변수입니다.
 *
 * ```ts
 * import { serverTime$ } from '@tossteam/react-rx';
 *
 * useEffect(() => {
 *   const subscription = serverTime$({
 *     // serverTime fetch 후 increment update 되는 주기 in ms
 *     // `@default: 1_000`
 *     tickInterval: 1_000,
 *     // serverTime fetch request 보내는 주기 in ms
 *     // `@default: 30_000`
 *     fetchInterval: 30_000,
 *     // serverTime fetch request fail시 retry하는 횟수
 *     // `@default: 3`
 *     retry: 3,
 *   }).subscribe(date => setDateNow(date));
 *   return () => {
 *     subscription.unsubscribe();
 *   };
 * }, []);
 * ```
 */
export function serverTime$({ tickInterval = 1_000, fetchInterval = 30_000, retry = 3 }: Params = {}) {
  return timer(0, fetchInterval).pipe(
    exhaustMap(() => fetchServerTime(retry)),
    switchMap(date => tickTime(date, tickInterval))
  );
}

function fetchServerTime(retryCount: number) {
  return from(axios.get<{ time: string }>(`https://assets-fe.toss.im/time?_=${Date.now()}`)).pipe(
    map(res => new Date(res.data.time)),
    retry(retryCount),
    catchError(() => {
      return EMPTY;
    })
  );
}

function tickTime(date: Date, tickInterval: number) {
  return timer(0, tickInterval).pipe(
    map(index => {
      const elapsedTime = index * tickInterval;
      return new Date(date.getTime() + elapsedTime);
    })
  );
}
