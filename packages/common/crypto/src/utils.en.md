---
title: utils
---

# utils

## byteToHex

Convert encrypted binary data to a string.

```typescript
byteToHex(
  // Binary data to convert into string
  encrypted: Uint8Array
): string
```

### Examples

```typescript
import BigNumber from 'bn.js';
import { byteToHex, pcksEncrypt as encrypt } from `@toss/crypto`;
const encrypted = encrypt(
  new BigNumber(n, 'hex'),
  new BigNumber(e, 16),
  message,
);

const encryptMessage = byteToHex(encrypted);
```
