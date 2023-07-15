import { replaceCount } from "../utils/replaceCount";

export default defineContentScript({
  matches: ["*://*.github.com/*"],
  runAt: "document_end",

  main() {
    main();
    setInterval(main, 1e3);
  },
});

function main() {
  const repo = getCurrentRepo();
  const owner = getCurrentOwner();
  if (!repo || !owner) return;

  const pr = getCurrentPr();
  if (pr) return replaceCount({ type: "pr", repo, owner, pr }, PrDiff);

  const commitHash = undefined;
  if (commitHash)
    return replaceCount(
      { type: "commit", repo, owner, ref: commitHash },
      TextDiff,
    );

  const commitHashes = undefined;
  if (commitHashes)
    return replaceCount(
      { type: "compare", repo, owner, commitRefs: commitHashes },
      TextDiff,
    );
}
