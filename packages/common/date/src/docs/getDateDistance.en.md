# getDateDistance

Calculates the difference between two `Date`s, in 'days', 'hours', 'minutes', and 'seconds'.

The difference is calculated as `endDate - startDate`. If `startDate` is after `endDate`, it returns `0`.

```typescript
function getDateDistance(
  // Start date
  startDate: Date,
  // End date
  endDate: Date
): { days: number; hours: number; minutes: number; seconds: number };
```

## Example

```typescript
const startDate = new Date(2022, 8, 10);
const endDate = new Date(2022, 8, 11);

// { days: 1, hours: 0, minutes: 0, seconds: 0 }
getDateDistance(startDate, endDate);
```
