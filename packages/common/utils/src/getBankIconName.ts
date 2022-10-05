const bankCodeLogoUrlMap: { [bankCode: number]: string | undefined } = {
  2: 'kdb',
  3: 'ibk',
  4: 'kb',
  5: 'keb',
  7: 'sh',
  11: 'nh',
  12: 'nh',
  20: 'woori',
  23: 'sc',
  26: 'shinhan',
  27: 'citi',
  31: 'dgb',
  32: 'bnk',
  34: 'kwangju',
  35: 'shinhan',
  37: 'kwangju',
  39: 'bnk',
  45: 'mg',
  48: 'cu',
  50: 'sb',
  54: 'hsbc',
  55: 'deutsche',
  57: 'jpmorgan',
  60: 'boa',
  61: 'bnp',
  62: 'icbc',
  64: 'sj',
  63: 'bankofchina',
  67: 'chinaconstruction',
  71: 'postoffice',
  81: 'hana',
  88: 'shinhan',
  89: 'kbank',
  90: 'kakao',
  92: 'toss',
  103: 'sbi',
  209: 'yuanta',
  218: 'kb',
  224: 'bnk',
  225: 'ibk',
  226: 'kb',
  227: 'daol',
  230: 'miraeasset',
  238: 'miraeasset',
  240: 'samsung',
  243: 'koreainvestment',
  247: 'nh',
  261: 'kyobo',
  262: 'hi',
  263: 'hyundaicar',
  264: 'kium',
  265: 'ebest',
  266: 'sk',
  267: 'ds',
  268: 'meritz',
  269: 'hanhwa',
  270: 'hana',
  271: 'toss',
  278: 'shinhan',
  279: 'db',
  280: 'eugene',
  287: 'meritz',
  288: 'kakaopay',
  290: 'bookook',
  291: 'shinyoung',
  292: 'cape',
  294: 'fokorea',
};

type IconType = 'normal' | 'fill' | 'square';

export function getBankIconName(bankCode: number, type: IconType = 'normal') {
  const bankIconName = bankCodeLogoUrlMap[bankCode];

  return bankIconName != null ? `bank-${type === 'normal' ? '' : `${type}-`}${bankIconName}` : bankIconName;
}

/**
 * 1x: 24 * 24
 * 2x: 48 * 48
 * 3x: 72 * 72
 * 4x: 96 * 96
 */
export function getBankIconUrl(
  bankCode: number,
  format: 'svg' | 'png1x' | 'png2x' | 'png3x' | 'png4x' | 'pdf' = 'svg',
  fallbackIconName?: string,
  type: IconType = 'normal'
) {
  fallbackIconName =
    // 아이콘 이름에 'icn-'이 붙어 있으면 제거합니다.
    fallbackIconName != null && fallbackIconName.startsWith('icn-') ? fallbackIconName.slice(4) : fallbackIconName;

  const iconName = getBankIconName(bankCode, type) ?? fallbackIconName;

  if (iconName == null) {
    return '';
  }

  switch (format) {
    case 'svg':
      return `https://static.toss.im/icons/svg/icn-${iconName}.svg`;
    case 'png1x':
      return `https://static.toss.im/icons/png/1x/icn-${iconName}.png`;
    case 'png2x':
      return `https://static.toss.im/icons/png/2x/icn-${iconName}.png`;
    case 'png3x':
      return `https://static.toss.im/icons/png/3x/icn-${iconName}.png`;
    case 'png4x':
      return `https://static.toss.im/icons/png/4x/icn-${iconName}.png`;
    case 'pdf':
      return `https://static.toss.im/icons/pdf/icn-${iconName}.pdf`;
  }
}
