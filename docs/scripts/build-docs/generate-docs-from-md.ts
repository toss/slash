import fse from 'fs-extra';
import glob from 'globby';
import path from 'path';
import { DOCS_ROOT, DOCUSAURUS_ROOT, PACKAGES_ROOT } from './constants';

const EN_OUTDIR = DOCS_ROOT;
const KO_OUTDIR = path.resolve(DOCUSAURUS_ROOT, 'i18n/ko/docusaurus-plugin-content-docs/current');

export async function generateDocsFromMD() {
  return await Promise.all([
    copyMDDocs(EN_OUTDIR, ['**/*.en.md', '**/*.ko.md', '**/README.md', '**/CHANGELOG.md']),
    generateLanguageDocs('en', EN_OUTDIR),
    generateLanguageDocs('ko', KO_OUTDIR),
    generateDefaultREADMEDocs(EN_OUTDIR),
    generateI18nREADMEDocs('ko', KO_OUTDIR),
  ]);
}

async function copyMDDocs(outdir: string, exclude: string[]) {
  const filepaths = await glob(`**/*.md`, {
    cwd: PACKAGES_ROOT,
    ignore: exclude,
  });

  await Promise.all(
    filepaths.map(async filepath => {
      const source = path.join(PACKAGES_ROOT, filepath);
      const destination = path.join(outdir, filepath);

      await fse.ensureDir(path.dirname(destination));
      await fse.copy(source, destination);
    })
  );
}

async function generateLanguageDocs(lang: string, outdir: string) {
  const filepaths = await glob(`**/*.${lang}.md`, {
    ignore: [`**/README.${lang}.md`],
    cwd: PACKAGES_ROOT,
  });

  await Promise.all(
    filepaths.map(async filepath => {
      const source = path.join(PACKAGES_ROOT, filepath);
      const destination = path.join(outdir, filepath).replace(new RegExp(`\\.${lang}\\.md$`), '.i18n.md');

      await fse.ensureDir(path.dirname(destination));
      await fse.copy(source, destination);
    })
  );
}

async function generateDefaultREADMEDocs(outdir: string) {
  const filepaths = await glob(`**/README.md`, { cwd: PACKAGES_ROOT });

  await Promise.all(
    filepaths.map(async filepath => {
      console.log(`Generating docs from README: ${filepath}`);

      const source = path.join(PACKAGES_ROOT, filepath);
      const destination = path.join(outdir, filepath).replace('/README.md', '/README.i18n.md');

      await fse.ensureDir(path.dirname(destination));
      await fse.copy(source, destination);
    })
  );
}

async function generateI18nREADMEDocs(lang: string, outdir: string) {
  const filepaths = await glob(`**/README.${lang}.md`, { cwd: PACKAGES_ROOT });

  await Promise.all(
    filepaths.map(async filepath => {
      console.log(`Generating docs from README: ${filepath}`);

      const source = path.join(PACKAGES_ROOT, filepath);
      const destination = path.join(outdir, filepath).replace(new RegExp(`\\.${lang}\\.md$`), '.i18n.md');

      await fse.ensureDir(path.dirname(destination));
      await fse.copy(source, destination);
    })
  );
}
