---
title: encrypt
---

# encrypt

## pkcsEncrypt

Function that encrypts to RSA PKCSV1, Polyfill will be required to support IE.

- https://tools.ietf.org/html/rfc8017#section-7.2.1

```typescript
pkcsEncrypt(
  // Public key
  n: BigNumber,
  // Secret key
  e: BigNumber,
  // String or binary data to encrypt
  message: string | Uint8Array
// Encryption result (binary data, use the byteToHex function to convert it into a string)
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
