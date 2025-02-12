import { CommitDiff } from "./components/CommitDiff";
import { CompareDiff } from "./components/CompareDiff";
import { PrDiff } from "./components/PrDiff";
import { getCurrentCompare } from "./utils/getCurrentCompare";
import { getCurrentOwner } from "./utils/getCurrentOwner";
import { getCurrentPr } from "./utils/getCurrentPr";
import { getCurrentRef } from "./utils/getCurrentRef";
import { getCurrentRepo } from "./utils/getCurrentRepo";
import { replaceCount } from "./utils/replaceCount";
import { SECOND } from "./utils/time";

main();
// TODO: schedule next interval for 1 second AFTER the main function finishes. If the main
// function takes more than 1 second, it might cause problems.
setInterval(main, SECOND);

function main() {
  const repo = getCurrentRepo();
  const owner = getCurrentOwner();
  if (!repo || !owner) return;

  const pr = getCurrentPr();
  if (pr) return replaceCount({ type: "pr", repo, owner, pr }, PrDiff);

  const commitHash = getCurrentRef();
  if (commitHash)
    return replaceCount(
      { type: "commit", repo, owner, ref: commitHash },
      CommitDiff,
    );

  const commitRefs = getCurrentCompare();
  if (commitRefs)
    return replaceCount(
      { type: "compare", repo, owner, commitRefs },
      CompareDiff,
    );
}
