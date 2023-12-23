import { isIOS } from './device/isIOS';

/**
 * @name copyToClipboard
 * @deprecated clipboard.writeText를 사용하세요.
 **/
export function copyToClipboard(text: string): boolean {
  if (!clipboardCopySupported()) {
    return false;
  }

  copy(text);
  return true;
}

function clipboardCopySupported() {
  return document.queryCommandSupported?.('copy') ?? false;
}

function copy(text: string) {
  const focusingContainer = document.body;

  const textArea = document.createElement('textArea') as HTMLTextAreaElement;
  textArea.value = text;
  textArea.contentEditable = 'true';
  textArea.readOnly = false;
  textArea.style.userSelect = 'text';
  textArea.style.webkitUserSelect = 'text';
  focusingContainer.insertBefore(textArea, focusingContainer.firstChild);
  if (isIOS()) {
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const selection = window.getSelection();

    if (selection !== null) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
  document.execCommand('copy');
  focusingContainer.removeChild(textArea);
}
