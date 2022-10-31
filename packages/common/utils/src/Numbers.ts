/** @tossdocs-ignore */
const units = ['', '십', '백', '천', '만', '십', '백', '천', '억', '십', '백', '천', '조', '십', '백', '천', '경'];

function chunk(value: number | string, byDigits: number) {
  const result: number[] = [];
  const source = String(value);

  for (let end = source.length; end >= 1; end = end - byDigits) {
    const start = Math.max(end - byDigits, 0);
    const slice = source.slice(start, end);

    result.push(Number(slice));
  }

  return result;
}

function createNumberFormatterBy(formatter: (num: number) => number) {
  return function formatNumber(value: number, unit: number) {
    if (unit < 1) {
      // 부동소수점 오류 때문에 unit < 1인 경우 특별 처리
      const reciprocal = 1 / unit;

      return formatter(value * reciprocal) / reciprocal;
    }

    return formatter(value / unit) * unit;
  };
}

export const ceilToUnit = createNumberFormatterBy(Math.ceil);

export const floorToUnit = createNumberFormatterBy(Math.floor);

export const roundToUnit = createNumberFormatterBy(Math.round);

export function formatToKoreanNumber(value: number, options: { floorUnit?: number; formatAllDigits?: boolean } = {}) {
  const flooredVal = floorToUnit(value, options.floorUnit || 1);

  if (flooredVal === 0) {
    return '0';
  }

  return chunk(flooredVal, 4)
    .reduce((prevFormatted, currChunkNum, index) => {
      if (currChunkNum === 0) {
        return prevFormatted;
      }

      const val = options.formatAllDigits ? formatThousands(currChunkNum) : commaizeNumber(currChunkNum);
      const unit = units[index * 4];

      return `${val}${unit} ${prevFormatted}`;
    }, '')
    .trim();
}

export function formatToKRW(
  value: number,
  options: {
    shouldHaveSpaceBeforeWon?: boolean;
    floorUnit?: number;
    ceilUnit?: number;
    formatAllDigits?: boolean;
  } = {}
) {
  const formattedVal = formatToKoreanNumber(value, options);

  if (options.shouldHaveSpaceBeforeWon === true) {
    return `${formattedVal} 원`;
  }

  return `${formattedVal}원`;
}

export function commaizeNumber(value: string | number) {
  const numStr = String(value);
  const decimalPointIndex = numStr.indexOf('.');
  const commaizeRegExp = /(\d)(?=(\d\d\d)+(?!\d))/g;

  return decimalPointIndex > -1
    ? numStr.slice(0, decimalPointIndex).replace(commaizeRegExp, '$1,') + numStr.slice(decimalPointIndex)
    : numStr.replace(commaizeRegExp, '$1,');
}

export function floorAndFormatNumber(value: number) {
  return commaizeNumber(Math.floor(value));
}

export function decommaizeNumber(numStr: string) {
  return Number(numStr.replace(/,/g, ''));
}

export function formatPhoneNumber(phoneNumber: string) {
  const isSeoulNumber = phoneNumber.startsWith('02');
  // 서울 국번(02)인 경우에만 지역번호가 2자리입니다.
  const areaCodeEndIndex = isSeoulNumber ? 2 : 3;

  // 10자리 전화번호 (또는 서울인 경우, 9자리 전화번호)에 대응하기 위해서
  // [0:areaCodeEndIndex], [areaCodeEndIndex:length-4], [length-4:length] 형식으로 나누고 join합니다.
  return [
    phoneNumber.slice(0, areaCodeEndIndex),
    phoneNumber.slice(areaCodeEndIndex, phoneNumber.length - 4),
    phoneNumber.slice(phoneNumber.length - 4),
  ].join('-');
}

function formatThousands(num: number) {
  const numString = String(num)
    .split('')
    .reverse()
    .map((digit, index) => {
      return digit !== '0' ? `${digit !== '1' ? digit : ''}${units[index]}` : '';
    })
    .reverse()
    .join('');
  return numString;
}

export function formatBusinessRegistrationNumber(businessRegistrationNumber: string) {
  if (businessRegistrationNumber.length !== 10) {
    throw new Error('사업자등록번호는 반드시 길이가 10 이어야 합니다.');
  }

  if (/^\d+$/.test(businessRegistrationNumber) === false) {
    throw new Error('사업자등록번호는 [0-9] 이어야 합니다.');
  }

  return businessRegistrationNumber.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
}
