# parseYYYYMMDD

Converts a string([RFC 2822 - Support Statement](https://datatracker.ietf.org/doc/html/rfc2822#page-14)) to a date. If the conversion failed, it throws `new Error('Invalid date format')`.

## Example

```typescript
parseYYYYMMDD('2023-11-14'); // Tue Nov 14 2023 09:00:00 GMT+0900
```
