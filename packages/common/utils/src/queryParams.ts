/** @tossdocs-ignore */

/**
 * param이 'true'나 'false'일때 true/false를 반환하고, 다른경우에는 null을 반환합니다.
 * @deprecated v18에서 제거 예정입니다.
 **/
export function parseQueryParamBoolean(param: string | string[] | undefined): boolean | null {
  if (param === undefined || Array.isArray(param)) {
    return null;
  }

  try {
    const result = JSON.parse(param);
    if (result === true) {
      return true;
    }

    if (result === false) {
      return false;
    }
  } catch {
    //
  }

  return null;
}

/**
 * param이 string인경우 값을 그대로 반환하고, 다른경우에는 null을 반환합니다.
 * @deprecated v18에서 제거 예정입니다.
 */
export function getStringQueryParam(param: string | string[] | undefined): string | null {
  if (param === undefined || typeof param !== 'string') {
    return null;
  }

  return param;
}

/**
 * param이 숫자면 숫자를 반환하고, 다른경우에는 null을 반환합니다.
 * @deprecated v18에서 제거 예정입니다.
 */
export function getNumberQueryParam(param: string | string[] | undefined): number | null {
  let parsed;
  if (param === undefined || Array.isArray(param)) {
    return null;
  } else {
    parsed = parseInt(param, 10);
    if (isNaN(parsed)) {
      return null;
    }
  }

  return parsed;
}
