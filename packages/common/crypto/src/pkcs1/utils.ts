/** @tossdocs-ignore */
import BigNumber from 'bn.js';

// 소스코드의 주석은 특별한 언급이 없다면 god_crypto의 원본 소스코드 입니다
// reference: https://github.com/invisal/god_crypto/blob/25ec83d77c73a5eec1f763fbc660a9442ce0b65e/src/rsa/rsa_internal.ts#L73

export function getKeySize(n: BigNumber): number {
  const sizeList = [64, 128, 256, 512, 1024];

  return sizeList.find(size => n.lt(new BigNumber(1).shln(size * 8))) ?? 256; // (n < (1n << size * 8n))
}

export function concat(...arg: Array<Uint8Array | number[]>) {
  const length = arg.reduce((a, b) => a + b.length, 0);
  const c = new Uint8Array(length);
  let ptr = 0;

  for (let i = 0; i < arg.length; i++) {
    c.set(arg[i]!, ptr);
    ptr += arg[i]!.length;
  }

  return c;
}

export function os2ip(m: Uint8Array): BigNumber {
  let n = new BigNumber(0);

  for (const c of m) {
    // n = (n << 8n) + BigInt(c);
    n = n.shln(8).add(new BigNumber(c));
  }

  return n;
}

export function rsaep(n: BigNumber, e: BigNumber, m: BigNumber): BigNumber {
  return powerMod(m, e, n);
}

export function powerMod(n: BigNumber, p: BigNumber, m: BigNumber): BigNumber {
  // p === 1
  if (p.eq(new BigNumber(1))) {
    return n;
  }

  // const t = power_mod(n, p >> 1n, m);
  const t = powerMod(n, p.shrn(1), m);
  const squared = t.mul(t).mod(m); // (t * t) % m;

  // p % 2 === 0
  if (p.mod(new BigNumber(2)).eq(new BigNumber(0))) {
    return squared;
  }

  return squared.mul(n).mod(m); // (t * t * n) % m;
}

export function i2osp(x: BigNumber, length: number): Uint8Array {
  const t = new Uint8Array(length);

  for (let i = length - 1; i >= 0; i--) {
    // x === 0
    if (x.eq(new BigNumber(0))) {
      break;
    }

    // x & 255
    t[i] = x.and(new BigNumber(255)).toNumber();

    // x = x >> 8
    x = x.shrn(8);
  }

  return t;
}

export function random(length: number) {
  if (typeof window === 'undefined' || window.crypto == null || window.crypto.getRandomValues == null) {
    return randomByMath(length);
  }

  const buffer = new Uint8Array(length);

  window.crypto.getRandomValues(buffer);

  // NOTE: 1 이상이어야 한다 (Uint8; 0 ~ 255)
  return buffer.map(val => (val > 0 ? val : 1));
}

function randomByMath(length: number): Uint8Array {
  const n = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    n[i] = ((Math.random() * 254) | 0) + 1;
  }

  return n;
}
