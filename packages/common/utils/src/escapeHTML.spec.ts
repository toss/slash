import { escapeHTML } from './escapeHTML';

describe('escapeHTML', () => {
  it('should replace special characters in the text and return it', () => {
    const REPLACED_TEXT = "'Tom&Jerry'";
    expect(escapeHTML(REPLACED_TEXT)).toBe('&#39;Tom&amp;Jerry&#39;');

    const REPLACED_TEXT2 = '<Test>';
    expect(escapeHTML(REPLACED_TEXT2)).toBe('&lt;Test&gt;');

    const REPLACED_TEXT3 = '"Test"';
    expect(escapeHTML(REPLACED_TEXT3)).toBe('&quot;Test&quot;');
  });

  it('should return the text as it is if there are no special characters', () => {
    const REPLACED_TEXT = 'Test';
    expect(escapeHTML(REPLACED_TEXT)).toBe('Test');
  });
});
