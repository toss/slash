/** @jsxImportSource react */
import React from 'react';

/** @tossdocs-ignore */
export function convertNewlineToJSX(str: string) {
  const chunks = str.replace(/\\n/g, '\n').split('\n');

  return chunks.map((line, index) => (
    <React.Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </React.Fragment>
  ));
}
