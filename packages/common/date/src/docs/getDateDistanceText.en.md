# getDateDistanceText

<<<<<<< HEAD
Formats a value returned by [getDateDistance()](https://slash.page/ko/libraries/common/date/src/docs/getdatedistance.i18n).

````typescript
function getDateDistanceText(
  // The difference calculated by `getDateDistance`
=======
Formats the return value of [getDateDistance()](https://slash.page/ko/libraries/common/date/src/docs/getdatedistance.i18n) to Korean string.

```typescript
function getDateDistanceText(
  // the return value of getDateDistance()
>>>>>>> 0d91b2a (fix en docs)
  timeUnits: { days: number; hours: number; minutes: number; seconds: number },
  // The method to format text
  options: {
<<<<<<< HEAD
    // Separator to distinguish days, hours, minutes, and seconds
    // @default ' '
    separator?: string;
    // Condition to check if `days` is included in the string
    // @default t => t.days > 0
    days?: (timeUnits: TimeUnits) => boolean;
    // Condition to check if `hours` is included in the string
    // @default t => t.hours > 0
    hours?: (timeUnits: TimeUnits) => boolean;
    // Condition to check if `minutes` is included in the string
    // @default t => t.minutes > 0
    minutes?: (timeUnits: TimeUnits) => boolean;
    // Condition to check if `seconds` is included in the string
=======
    // separator for days, hours, minutes, seconds
    // @default ' '
    separator?: string;
    // determine to include days
    // @default t => t.days > 0
    days?: (timeUnits: TimeUnits) => boolean;
    // determine to include hours
    // @default t => t.hours > 0
    hours?: (timeUnits: TimeUnits) => boolean;
    // determine to include minutes
    // @default t => t.minutes > 0
    minutes?: (timeUnits: TimeUnits) => boolean;
    // determine to include seconds
>>>>>>> 0d91b2a (fix en docs)
    // @default t => t.seconds > 0
    seconds?: (timeUnits: TimeUnits) => boolean;
  }
): string;
````

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
