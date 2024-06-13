# Masker

개인정보보호위원회, KISA 기준으로 개인정보를 마스킹하는 유틸입니다.

## Masker.maskName

개인정보보호위원회, KISA 기준으로 이름을 마스킹하는 메소드입니다.

```typescript
Masker.maskName('토스'); // 토*
Masker.maskName('김토스'); // 김*스
```

## Masker.maskPhoneNumber

개인정보보호위원회, KISA 기준으로 핸드폰 번호를 마스킹하는 메소드입니다.

```typescript
Masker.maskPhoneNumber('010-1234-5678'); // 010-****-5678
Masker.maskPhoneNumber('01012345678'); // 010****5678
```
