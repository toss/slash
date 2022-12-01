/** @tossdocs-ignore */
export const get = <T = any>(obj: Record<string, any>, path: string, defaultValue?: T): T => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((acc, key) => (acc !== null && acc !== undefined ? acc[key] : acc), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return (result === undefined || result === obj ? defaultValue : result) as T;
};

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
