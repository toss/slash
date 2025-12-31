# getDateDistanceText

[getDateDistance()](https://slash.page/ko/libraries/common/date/src/docs/getDateDistance.i18n)가 반환하는 값을 인자로 받아서, 문자열로 포맷팅 해줍니다.

```typescript
function getDateDistanceText(
  // getDateDistance가 반환한 시간의 차이 값
  timeUnits: { days: number; hours: number; minutes: number; seconds: number },
  // 텍스트를 포매팅할 방법
  options: {
    // 일, 시, 분, 초를 구분할 separator
    // @default ' '
    separator?: string;
    // `일`을 포함할 기준
    // @default t => t.days > 0
    days?: (timeUnits: TimeUnits) => boolean;
    // `시간`을 포함할 기준
    // @default t => t.hours > 0
    hours?: (timeUnits: TimeUnits) => boolean;
    // `분`을 포함할 기준
    // @default t => t.minutes > 0
    minutes?: (timeUnits: TimeUnits) => boolean;
    // `초`를 포함할 기준
    // @default t => t.seconds > 0
    seconds?: (timeUnits: TimeUnits) => boolean;
  }
): string;
```

## Examples

```typescript
const startDate = new Date('2022-08-10');
const endDate = new Date('2022-08-11');

const distance = getDateDistance(startDate, endDate);
getDateDistanceText(distance); // '1일'
```

```typescript
const startDate = new Date('2022-08-10T00:00:00+09:00');
const endDate = new Date('2022-08-11T12:00:00+09:00');

const distance = getDateDistance(startDate, endDate);
getDateDistanceText(distance); // '1일 12시간'
```

```typescript
const startDate = new Date('2022-08-10T00:00:00+09:00');
const endDate = new Date('2022-08-11T12:00:00+09:00');

const distance = getDateDistance(startDate, endDate);
getDateDistanceText(distance, { days: t => t.days > 1 }); // '12시간'
```
