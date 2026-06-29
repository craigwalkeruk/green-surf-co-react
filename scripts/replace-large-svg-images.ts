import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { normalizeSvgReference } from '../src/test/svg-reference-normalizer';

type Options = {
  input: string;
  output?: string;
  minArea?: number;
  fill?: string;
};

function parseArgs(argv: string[]): Options {
  const [input, ...rest] = argv;
  if (!input) {
    throw new Error(
      'Usage: tsx scripts/replace-large-svg-images.ts <input.svg> [output.svg] [--min-area=250000] [--fill=#e5e7eb]',
    );
  }

  const options: Options = { input };
  for (const arg of rest) {
    if (arg.startsWith('--min-area=')) {
      options.minArea = Number(arg.slice('--min-area='.length));
    } else if (arg.startsWith('--fill=')) {
      options.fill = arg.slice('--fill='.length);
    } else if (!options.output) {
      options.output = arg;
    }
  }

  return options;
}

async function main() {
  const { input, output, minArea = 250_000, fill = '#e5e7eb' } = parseArgs(
    process.argv.slice(2),
  );

  const inputPath = path.resolve(process.cwd(), input);
  const outputPath = path.resolve(process.cwd(), output ?? inputPath);
  const source = await readFile(inputPath, 'utf8');

  const { source: result, replaced } = normalizeSvgReference(source, {
    minArea,
    fill,
  });

  await writeFile(outputPath, result, 'utf8');
  console.log(
    `Replaced ${replaced} large SVG image node(s) in ${path.relative(
      process.cwd(),
      outputPath,
    )}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
