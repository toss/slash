/** @tossdocs-ignore */
import { cloneElement, ReactElement } from 'react';
import { ThermalPrintable } from '../types/ThermalPrintable';
import { ThermalPrintTxt, ThermalPrintTxtProps, ThermalPrintTxtSize, txtChildrenToString } from './ThermalPrintTxt';

export type ThermalPrintRowProps = {
  left: string | ReactElement<ThermalPrintTxtProps>;
  right: string | ReactElement<ThermalPrintTxtProps>;
  /** left, right 사이 공백으로, 텍스트 사이즈와 동일한 범위로 지정 */
  gap?: ThermalPrintTxtSize;
};

export const ThermalPrintRow: ThermalPrintable<ThermalPrintRowProps> = ({ left, right }) => {
  return (
    <div>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
};

ThermalPrintRow.print = (context, elem) => {
  const { printer, config } = context;
  const { left, right, gap = 0 } = elem.props;

  const leftStr = typeof left === 'string' ? left : txtChildrenToString(left.props.children);
  const rightStr = typeof right === 'string' ? right : txtChildrenToString(right.props.children);

  /* textSize의 범위가 0-7이며, default 0에서 숫자가 하나씩 증가할수록 사이즈가 배로 커지기 때문에, 전체 텍스트 버퍼의 길이에 (textSize + 1)을 배수로 곱해준다. */
  const leftSize = typeof left === 'string' ? 1 : (left.props.size?.height ?? 0) + 1;
  const rightSize = typeof right === 'string' ? 1 : (right.props.size?.height ?? 0) + 1;

  const leftBufferLength = context.encode(leftStr).length * leftSize;
  const rightBufferLength = context.encode(rightStr).length * rightSize;
  const gapBufferLength = context.encode(' '.repeat(gap)).length;

  /* 우측과 최소공백 만큼의 길이를 뺀 나머지 길이보다 좌측 길이가 더 긴 경우, 줄바꿈을 위해 고정된 길이로 제한한다 */
  const remainingLength = config.width - rightBufferLength - gapBufferLength;
  const leftLength = leftBufferLength > remainingLength ? remainingLength : leftBufferLength;
  const rightLength = rightBufferLength;

  /* 고정된 좌측 길이 만큼 문자열을 잘라 배열로 만든다 -> 배열을 순회하며 줄바꿈하며 출력 */
  const chunkLength = Math.floor((leftStr.length * leftLength) / leftBufferLength);
  const leftStrs = leftStr.match(new RegExp('.{1,' + chunkLength + '}', 'g')) ?? [leftStr];

  for (let i = 0; i < leftStrs.length; i++) {
    const currentLeftStr = leftStrs[i]!.trimStart();
    typeof left === 'string'
      ? printer.append(currentLeftStr)
      : ThermalPrintTxt.print(context, defaultPropsForTxt(left, currentLeftStr));

    /* 현재 좌측 글자 길이에 따른 공백 구하기 */
    const currentLeftLength = context.encode(currentLeftStr).length * leftSize;
    const spaces = config.width - currentLeftLength - rightLength;
    for (let j = 0; j < spaces; j++) {
      printer.append(Buffer.from(' '));
    }

    /* 우측 문자열은 첫 번째 열에 표기 */
    if (i === 0) {
      typeof right === 'string' ? printer.append(right) : ThermalPrintTxt.print(context, defaultPropsForTxt(right));
    }
    printer.newLine();
  }
};

const defaultPropsForTxt = (txt: ReactElement<ThermalPrintTxtProps>, textContent?: string) => {
  const elem = cloneElement(txt, {
    display: txt.props.display ?? 'inline',
    children: textContent ?? txt.props.children,
  });

  return elem;
};
