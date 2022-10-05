import fs from 'fs';

export function filterFilesByContent(files: string[], condition: (content: string) => boolean) {
  return files.filter((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    return condition(content);
  })
}
