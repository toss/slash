---
title: utils
---

# utils

## byteToHex

암호화된 이진 데이터를 문자열로 바꿉니다.

```typescript
byteToHex(
  // 문자열로 바꿀 이진 데이터
  encrypted: Uint8Array
): string
```

### Examples

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
