/** @tossdocs-ignore */
export function range(start: number, end?: number, step = 1): number[] {
  const _start = end === undefined ? 0 : start;
  const _end = end === undefined ? start : end;

  const output = [];
  let current = _start;
  while (current < _end) {
    output.push(current);
    current += step;
  }
  return output;
}
