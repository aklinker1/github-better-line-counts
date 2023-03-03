/**
 * Zip all the sources up for the firefox review.
 *
 * ```sh
 * tsx scripts/zip-sources.ts
 * ```
 */
import { zip as zipDir } from "zip-a-folder";
import pkg from "../package.json";
import path from "node:path";
import fs from "node:fs/promises";
import { cyan, done } from "./utils";
import glob from "fast-glob";

zipSources();

async function zipSources() {
  // Prepare
  const output = `artifacts/github-better-diffs-v${pkg.version}-sources.zip`;
  const outputDir = path.dirname(output);
  const tempDir = path.join(outputDir, ".sources");
  console.log(`Zipping sources → ${cyan(output)}`);

  await fs.rm(tempDir, { recursive: true, force: true }).catch();
  await fs.mkdir(tempDir, { recursive: true });

  // Copy Sources
  const files = await glob(["*", "src/**/*", "public/**/*", "scripts/**/*"], {
    onlyFiles: true,
    ignore: ["**/__tests__/**"],
  });
  const pairs = files.map((file) => [file, path.join(tempDir, file)]);
  for (const [input, output] of pairs) {
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.copyFile(input, output);
  }

  // Zip
  await zipDir(tempDir, output);

  // Cleanup
  await fs.rm(tempDir, { recursive: true, force: true });

  done();
}
