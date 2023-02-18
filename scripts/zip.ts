/**
 * Zip a build output for installing manually or uploading to the stores.
 *
 * ```sh
 * tsx scripts/zip.ts {chrome|firefox}
 * ```
 */
import { zip as zipDir } from "zip-a-folder";
import pkg from "../package.json";
import path from "node:path";
import fs from "node:fs/promises";
import { cyan, done } from "./utils";

const target = process.argv[2] === "firefox" ? "firefox" : "chrome";
zip(target);

async function zip(target: "chrome" | "firefox") {
  const input = `dist-${target}`;
  const output = `artifacts/github-better-diffs-v${pkg.version}-${target}.zip`;
  const outputDir = path.dirname(output);

  console.log(`Zipping ${cyan(input)} → ${cyan(output)}`);
  await fs.mkdir(outputDir, { recursive: true });
  await zipDir(input, output);

  done();
}
