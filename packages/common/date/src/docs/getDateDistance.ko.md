# getDateDistance

두 개의 `Date`가 가리키는 시간의 차이를 '일', '시간', '분', '초' 단위로 계산합니다.

계산하는 시간의 차이는 `endDate - startDate` 입니다. `startDate` 가 `endDate` 보다 나중이면, `0` 을 반환합니다.

```typescript
function getDateDistance(
  // 시작 시간
  startDate: Date,
  // 끝 시간
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
