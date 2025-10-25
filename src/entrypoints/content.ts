const mountId = Math.random();

export default defineContentScript({
  matches: ["*://*.github.com/*"],
  runAt: "document_end",

  main(ctx) {
    main();
    // TODO: schedule next interval for 1 second AFTER the main function finishes. If the main
    // function takes more than 1 second, it might cause problems.
    const loop = ctx.setInterval(main, SECOND);
    ctx.setTimeout(() => {
      clearInterval(loop);
    }, 10 * SECOND);
  },
});

function main() {
  const repo = getCurrentRepo();
  const owner = getCurrentOwner();
  if (!repo || !owner) return;

  const pr = getCurrentPr();
  if (pr) return replaceCount({ mountId, type: "pr", repo, owner, pr }, PrDiff);

  const commitHash = getCurrentRef();
  if (commitHash)
    return replaceCount(
      { mountId, type: "commit", repo, owner, ref: commitHash },
      CommitDiff,
    );

  const commitRefs = getCurrentCompare();
  if (commitRefs)
    return replaceCount(
      { mountId, type: "compare", repo, owner, commitRefs },
      CompareDiff,
    );
}
