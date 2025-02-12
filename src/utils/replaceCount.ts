import { DIFF_COMPONENT_ID } from "./constants";
import { getGithubService } from "./github";
import type { RecalculateOptions, RecalculateResult } from "./github";
import { logger } from "./logger";

/**
 * Calculate and add the generated count to the page.
 */
export function replaceCount(
  options: RecalculateOptions,
  component: (statsPromise: Promise<RecalculateResult>) => Promise<void>,
) {
  const existing = document.getElementById(DIFF_COMPONENT_ID);
  if (existing) return;

  const start = Date.now();
  const github = getGithubService();
  const stats = github.recalculateDiff(options).then((diff) => {
    logger.debug("Diff:", diff);
    logger.debug(`Diff calculated in ${Date.now() - start}ms`);
    return diff;
  });

  component(stats);
}
