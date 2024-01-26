export const CommitDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelector<HTMLElement>("#toc>*>strong:nth-child(2)"),
  getDeletionsElement: () =>
    document.querySelector<HTMLElement>("#toc>*>strong:nth-child(3)"),
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
