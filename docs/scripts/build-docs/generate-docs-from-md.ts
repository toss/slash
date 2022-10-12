import fse from 'fs-extra';
import glob from 'globby';
import path from 'path';
import { DOCS_ROOT, DOCUSAURUS_ROOT, PROJECT_ROOT } from './constants';

const EN_OUTDIR = DOCS_ROOT;
const KO_OUTDIR = path.resolve(DOCUSAURUS_ROOT, 'i18n/ko/docusaurus-plugin-content-docs/current');

export async function generateDocsFromMD() {
  return await Promise.all([generateLanguageDocs('en', EN_OUTDIR), generateLanguageDocs('ko', KO_OUTDIR)]);
}

async function generateLanguageDocs(lang: string, outdir: string) {
  const filepaths = await glob(`**/*.${lang}.md`, {
    cwd: PROJECT_ROOT,
  });

  await Promise.all(
    filepaths.map(async filepath => {
      const source = path.join(PROJECT_ROOT, filepath);
      const destination = path.join(outdir, filepath);

      await fse.ensureDir(path.dirname(destination));
      await fse.copy(source, destination);
    })
  );
}
