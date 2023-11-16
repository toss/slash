# parseYYYYMMDD

입력받은 문자열([RFC 2822 - 지원명세서](https://datatracker.ietf.org/doc/html/rfc2822#page-14))을 Date로 변환합니다. Date로 바꾸는데 실패할 경우, `new Error('Invalid date format')` 을 throw 합니다.

## Example

```typescript
parseYYYYMMDD('2023-11-14'); // Tue Nov 14 2023 09:00:00 GMT+0900 (한국 표준시)

parseYYYYMMDD('2023/11/14'); // Tue Nov 14 2023 00:00:00 GMT+0900 (한국 표준시)

parseYYYYMMDD('2023 11 14'); // Tue Nov 14 2023 00:00:00 GMT+0900 (한국 표준시)

parseYYYYMMDD('Nov 14, 2023'); // Tue Nov 14 2023 00:00:00 GMT+0900 (한국 표준시)
```
