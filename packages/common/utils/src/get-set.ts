/**
 * @name get
 * @description
 * 객체의 특정 경로에 있는 값을 반환합니다.
 * ```typescript
 * get(
 *   // 값을 가져올 객체
 *   obj: Record<string, any>,
 *   // 가져올 값의 경로
 *   path: string,
 *   // 경로에 해당하는 값이 없을 때 반환할 기본값
 *   // @default undefined
 *   defaultValue?: any
 * ): any
 * ```
 * @example
 * get({ a: { b: 1 } }, 'a.b') // 1
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
 **/
export const get = (obj: Record<string, any>, path: string, defaultValue = undefined) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((acc, key) => (acc !== null && acc !== undefined ? acc[key] : acc), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

/**
 * @name set
 * @description
 * 객체의 특정 경로에 값을 set 합니다.
 * ```typescript
 * set(
 *   // 값을 set할 객체
 *   obj: Record<string, any>,
 *   // set할 값의 경로
 *   path: string,
 *   // set할 값
 *   defaultValue?: any
 * ): Record<string, any>
 * ```
 * @example
 * set({ a: { b: 1 } }, 'a.b', 2) // { a: { b: 2 } }
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_set
 **/
export const set = (obj: Record<string, any>, path: string, value: any) => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = path.match(/([^[.\]])+/g);

  pathArray?.reduce((acc, key, i) => {
    if (acc[key] == null) {
      acc[key] = {};
    }
    if (i === pathArray.length - 1) {
      acc[key] = value;
    }
    return acc[key];
  }, obj);

  return obj;
};
