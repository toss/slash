---
title: encrypt
---

# encrypt

## pkcsEncrypt

RSA PKCSV1 으로 encrypt 하는 함수, IE를 지원해야할 경우 Polyfill이 필요할 수 있습니다.

- https://tools.ietf.org/html/rfc8017#section-7.2.1

```typescript
pkcsEncrypt(
  // 퍼블릭 키
  n: BigNumber,
  // 비밀 키
  e: BigNumber,
  // 암호화할 문자열 또는 이진 데이터
  message: string | Uint8Array
// 암호화 결과 (이진 데이터, byteToHex 함수로 문자열로 바꾸세요)
): Uint8Array
```

### Example

```typescript
import BigNumber from 'bn.js';
import { byteToHex, pkcsEncrypt as encrypt } from '@toss/crypto';
const encrypted = encrypt(
  new BigNumber(n, 'hex'),
  new BigNumber(e, 16),
  message,
);
const encryptMessage = byteToHex(encrypted);
```
