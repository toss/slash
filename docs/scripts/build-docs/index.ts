import { generateDocsFromJSDoc } from './generate-docs-from-jsdoc';
import { generateDocsFromMD } from './generate-docs-from-md';

async function main() {
  await Promise.all([generateDocsFromJSDoc(), generateDocsFromMD()]);
}

main().catch(error => {
  console.error(error.stack);
  process.exit(1);
});
