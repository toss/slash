# clipboard

클립보드에 텍스트를 복사하는 유틸입니다. 복사 성공 여부를 리턴합니다.

## Example

```typescript
// 'Hello, World!' 라는 문자열을 클립보드에 복사해둡니다.
const isSuccess = clipboard.writeText('Hello, World!');

if (isSuccess) {
  window.alert('복사 성공!');
}
```
