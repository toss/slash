/** @tossdocs-ignore */
import { copyToClipboard, isIE } from '.';

async function writeText(text: string): Promise<boolean> {
  if (isIE() || !clipboardSupported()) {
    return copyToClipboard(text);
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
  writeText,
};
