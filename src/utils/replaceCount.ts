import type { RecalculateOptions, RecalculateResult } from "./github";

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
  const stats = githubProxy.recalculateDiff(options).then((diff) => {
    logger.debug("Diff:", diff);
    logger.debug(`Diff calculated in ${Date.now() - start}ms`);
    return diff;
  });

  component(stats);
}
