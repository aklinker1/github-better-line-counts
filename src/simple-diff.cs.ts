/**
 * Simplify the diff on GitHub's PR pages.
 */
import { DiffStat } from "./components/DiffStat";
import { addUrlChangeListener } from "./utils/addUrlChangeListener";
import { getCurrentOwner } from "./utils/getCurrentOwner";
import { getCurrentPr } from "./utils/getCurrentPr";
import { getCurrentRepo } from "./utils/getCurrentRepo";
import { getGithubApi } from "./utils/github";
import { logger } from "./utils/logger";

replaceCount();
addUrlChangeListener(replaceCount);

function replaceCount() {
  const pr = getCurrentPr();
  const repo = getCurrentRepo();
  const owner = getCurrentOwner();
  if (!pr || !repo || !owner) return;

  const start = Date.now();
  const api = getGithubApi();
  const stats = api.recalculateDiff({ pr, owner, repo }).then((diff) => {
    logger.debug("Diff:", diff);
    logger.debug(`Diff calculated in ${Date.now() - start}ms`);
    return diff;
  });

  DiffStat(stats);
}
