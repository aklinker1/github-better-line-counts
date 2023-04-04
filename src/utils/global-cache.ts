import { createKeyValueCache } from "./cache";
import type { Github } from "./github";

export const commitHashDiffsCache =
  createKeyValueCache<Github.RecalculateResult>("commit-hash-diffs");
