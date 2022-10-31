/** @tossdocs-ignore */
let nextUniqueId = 0;

export function generateID(prefix = '') {
  nextUniqueId = nextUniqueId + 1;
  return `${prefix}${nextUniqueId}`;
}
