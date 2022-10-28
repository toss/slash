# Masker

A utility to mask a personal information based on the standard of the Personal Information Protection Commission(PIPC) and the Korea Internet & Security Agency(KISA).

> PIPC and KISA are a public institution in South Korea.

## Masker.maskName

Masks the given name based on the standard of PIPC and KISA.

```typescript
Masker.maskName('David'); // 'D***d'
Masker.maskName('John Legend'); // 'Jo** ****nd'
```

## Masker.maskPhoneNumber

Masks the given phone number based on the standard of PIPC and KISA.

```typescript
Masker.maskPhoneNumber('010-1234-5678'); // 010-****-5678
Masker.maskPhoneNumber('01012345678'); // 010****5678
```
