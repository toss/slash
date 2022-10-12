import fs from 'fs';
import fse from 'fs-extra';
import glob from 'globby';
import path from 'path';
import { DOCS_ROOT, PROJECT_ROOT } from './constants';

const TOSSDOCS_IGNORE_SYMBOL = '/** @tossdocs-ignore */';

export async function generateDocsFromJSDoc() {
  const filepaths = await glob('**/*.{ts,tsx}', {
    ignore: ['**/*.{spec,test,d,setup,stories,config}.{ts,tsx}', 'docs/**/*'],
    cwd: PROJECT_ROOT,
  });

  if (filepaths.length === 0) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const documentation = await import('documentation');

  await Promise.all(
    filepaths.map(async filepath => {
      const fullpath = path.join(PROJECT_ROOT, filepath);
      const source = fs.readFileSync(fullpath, 'utf-8');

      if (source.includes(TOSSDOCS_IGNORE_SYMBOL)) {
        return;
      }

      console.log(`Generating docs from JSDoc: ${filepath}`);

      const doc = await documentation.build(fullpath, {
        external: [],
        shallow: true,
        extension: 'ts',
      });

      const built = await documentation.formats.md(doc);

      const filename = getFilename(filepath, { withExtension: false });

      const title = `---\ntitle: ${filename}\n---\n`;
      const content = `${title}${built}`;
      const destination = path.join(DOCS_ROOT, `${filepath}.tossdocs.md`);

      await fse.ensureDir(path.dirname(destination));
      return fs.writeFileSync(destination, content);
    })
  );
}

function getFilename(
  path: string,
  options?: {
    withExtension: boolean;
  }
) {
  const { withExtension = true } = options ?? {};

  const names = path.split('/');
  const filename = names[names.length - 1];

  if (filename == null) {
    throw new Error(`path가 올바르지 않습니다. ${path}`);
  }

  return withExtension ? filename : filename.split('.')[0];
}
