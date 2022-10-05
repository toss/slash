import fs from 'fs';

interface BuildEntry {
  source: string;
  destination: string;
}

export function pathsToBuildEntries(paths: string[]): BuildEntry[] {
  return paths.map<BuildEntry>(path => ({
    source: path,
    destination: `${path}.tossdocs.md`,
  }));
}

export async function generateMarkdownFromEntries(entries: BuildEntry[]) {
  const documentation = await import('documentation');
  await Promise.all(
    entries.map(({ source, destination }) => {
      documentation
        .build(source, {
          external: [],
          shallow: true,
          extension: 'ts',
        })
        .then(documentation.formats.md as any)
        .then((markdown: string) => {
          const filename = getFilename(source, { withExtension: false });
          const title = `---\ntitle: ${filename}\n---\n`;
          const markdownWithTitle = `${title}${markdown}`;
          fs.writeFileSync(destination, markdownWithTitle);
        });
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
