import glob from 'fast-glob';
import { filterFilesByContent } from './filterFilesByContent';
import { generateMarkdownFromEntries, pathsToBuildEntries } from './jsx-to-md';

const TOSSDOCS_IGNORE_SYMBOL = '/** @tossdocs-ignore */';

async function main() {
  const files = await glob('**/*.{ts,tsx}', {
    ignore: ['**/*.{spec,test,d,setup,stories,config}.{ts,tsx}'],
  });

  if (files.length === 0) {
    return;
  }

  const entries = pathsToBuildEntries(
    filterFilesByContent(files, content => !content.includes(TOSSDOCS_IGNORE_SYMBOL))
  );
  await generateMarkdownFromEntries(entries);
}

main();
