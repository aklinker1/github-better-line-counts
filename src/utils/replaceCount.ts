import { Github, getGithubApi } from "./github";

/**
 * Calculate and add the generated count to the page.
 */
export function replaceCount(
  options: Github.RecalculateOptions,
  component: (statsPromise: Promise<Github.RecalculateResult>) => Promise<void>,
) {
  const existing = document.getElementById(DIFF_COMPONENT_ID);
  if (existing) return;

  const start = Date.now();
  const api = getGithubApi();
  const stats = api.recalculateDiff(options).then((diff) => {
    logger.debug("Diff:", diff);
    logger.debug(`Diff calculated in ${Date.now() - start}ms`);
    return diff;
  });

  component(stats);
}
