import BigNumber from 'bn.js';
import { powerMod } from './utils';

describe('powerMod function tests', () => {
  test('powerMod with small numbers', () => {
    const n = new BigNumber(2);
    const p = new BigNumber(3);
    const m = new BigNumber(5);
    expect(powerMod(n, p, m).toString()).toBe(new BigNumber(3).toString()); // 2^3 % 5 = 8 % 5 = 3
  });

  test('powerMod with p = 1 should return n', () => {
    const n = new BigNumber(7);
    const p = new BigNumber(1);
    const m = new BigNumber(10);
    expect(powerMod(n, p, m).toString()).toBe(n.toString()); // 7^1 % 10 = 7
  });

  test('powerMod with even p', () => {
    const n = new BigNumber(4);
    const p = new BigNumber(4);
    const m = new BigNumber(17);
    expect(powerMod(n, p, m).toString()).toBe(new BigNumber(1).toString()); // 4^4 % 17 = 256 % 17 = 1
  });

  test('powerMod with odd p', () => {
    const n = new BigNumber(5);
    const p = new BigNumber(3);
    const m = new BigNumber(13);
    expect(powerMod(n, p, m).toString()).toBe(new BigNumber(8).toString()); // 5^3 % 13 = 125 % 13 = 8
  });
});
