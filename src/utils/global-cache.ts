import { createKeyValueCache } from "./cache";
import type { RecalculateResult } from "./github";

export const commitHashDiffsCache =
  createKeyValueCache<RecalculateResult>("commit-hash-diffs");
