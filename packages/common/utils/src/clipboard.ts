/** @tossdocs-ignore */
import { copyToClipboard, isIE } from '.';

async function writeText(text: string): Promise<boolean> {
  if (isIE()) {
    return copyToClipboard(text);
  }

  if (!clipboardSupported()) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return copyToClipboard(text);
  }
}

function clipboardSupported() {
  return navigator.clipboard != null;
}

export const clipboard = {
  /**
   * @name clipboard.writeText
   *
   * 클립보드에 텍스트를 복사합니다.
   *
   * `clipboard` 유틸은 `document.navigator.clipboard`를 랩핑한 라이브러리로, MDN 레벨에서 Deprecated 된 `document.execCommand('copy')`에 대응하기 위해 만들었습니다.
   *
   * [MDN 문서](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard)
   *
   * > Working with the clipboard in extensions is transitioning from the Web API document.execCommand method (which is deprecated) to the navigator.clipboard method.
   *
   * **주의할 점**
   *
   * document.execCommand와 다르게, clipboard API는 사용할 때 `clipboard-write` permission이 필요합니다. 그래서 fallback으로 기존의 execCommand를 사용하는 copyToClipboard로 랩핑했습니다.
   *
   * ```typescript
   * clipboard.writeText(
   *   // 클립보드에 복사할 텍스트
   *   text: string
   * // 복사에 성공했는지 여부
   * ): boolean
   * ```
   * @example
   * // `'text'` 문자열을 클립보드에 복사해둡니다.
   * await clipboard.writeText('text');
   */
  writeText,
};
