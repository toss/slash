/** @tossdocs-ignore */
let nextUniqueId = 0;

/**
 * @deprecated This feature is now available in the es-toolkit package.
 */
export function generateID(prefix = '') {
  nextUniqueId = nextUniqueId + 1;
  return `${prefix}${nextUniqueId}`;
}
