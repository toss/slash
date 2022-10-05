/**
 * @name SECOND
 * @description
 * 1초를 밀리세컨드(milliseconds)로 나타냈을 때의 값을 의미합니다. (`1000`)
 * @example
 * import { SECOND } from '@tossteam/constants';
 *
 * setTimeout(doSomething, 2 * SECOND);
 */
export const SECOND = 1000;

/**
 * @name MINUTE
 * @description
 * 1분을 밀리세컨드(milliseconds)로 나타냈을 때의 값을 의미합니다. (`60000`)
 * @example
 * import { MINUTE } from '@tossteam/constants';
 *
 * setTimeout(doSomething, 2 * MINUTE);
 */
export const MINUTE = SECOND * 60;

/**
 * @name HOUR
 * @description
 * 1시간을 밀리세컨드(milliseconds)로 나타냈을 때의 값을 의미합니다. (`3600000`)
 * @example
 * import { HOUR } from '@tossteam/constants';
 *
 * setTimeout(doSomething, 2 * HOUR);
 */
export const HOUR = MINUTE * 60;

/**
 * @name DAY
 * @description
 * 1일을 밀리세컨드(milliseconds)로 나타냈을 때의 값을 의미합니다. (`86400000`)
 * @example
 * import { DAY } from '@tossteam/constants';
 *
 * setTimeout(doSomething, 2 * DAY);
 */
export const DAY = HOUR * 24;
