export const CompareDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelectorAll<HTMLElement>(".toc-diff-stats>strong")[0],
  getDeletionsElement: () =>
    document.querySelectorAll<HTMLElement>(".toc-diff-stats>strong")[1],
  addSpinnerToPage(spinner) {
    const container = this.getDeletionsElement()?.parentElement;
    container?.appendChild(spinner);
  },
  getAdditionsText: (count) =>
    i18n.tp("diffs_additionsText", count, [String(count)]),
  getDeletionsText: (count) =>
    i18n.tp("diffs_deletionsText", count, [String(count)]),
  getGeneratedText: (count) =>
    i18n.tp("diffs_generatedText", count, [String(count)]),
});
