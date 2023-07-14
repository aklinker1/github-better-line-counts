/**
 * Simplify the diff on GitHub's PR pages.
 */
import { DIFF_STAT_ID, DiffStat } from "../components/DiffStat";
import { getCurrentOwner } from "../utils/getCurrentOwner";
import { getCurrentPr } from "../utils/getCurrentPr";
import { getCurrentRepo } from "../utils/getCurrentRepo";
import { getGithubApi } from "../utils/github";
import { logger } from "../utils/logger";

export default defineContentScript({
  matches: ["*://*.github.com/*"],
  runAt: "document_end",
  main: () => {
    replaceCount();
    setInterval(replaceCount, 1e3);
  },
});

function replaceCount() {
  const pr = getCurrentPr();
  const repo = getCurrentRepo();
  const owner = getCurrentOwner();
  if (!pr || !repo || !owner) return;

  const existing = document.getElementById(DIFF_STAT_ID);
  if (existing) return;

  const start = Date.now();
  const api = getGithubApi();
  const stats = api.recalculateDiff({ pr, owner, repo }).then((diff) => {
    logger.debug("Diff:", diff);
    logger.debug(`Diff calculated in ${Date.now() - start}ms`);
    return diff;
  });

  DiffStat(stats);
}
