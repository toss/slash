/** @tossdocs-ignore */
/** @jsxImportSource react */
import { ReactNode } from 'react';

export default function Style({ css, children }: { css: string; children?: ReactNode }) {
  return (
    <>
      <style type="text/css">{css}</style>
      {children}
    </>
  );
}
const PREFIX = 'tossteam-react__';
export function generateClassNames<T extends Record<string, string>>(classNames: T) {
  return Object.keys(classNames).reduce((acc, key) => ({ ...acc, [key]: `${PREFIX}${classNames[key]}` }), {}) as T;
}
