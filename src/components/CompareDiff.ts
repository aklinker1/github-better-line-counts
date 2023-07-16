export const CompareDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelectorAll<HTMLElement>(".toc-diff-stats>strong")[0],
  getDeletionsElement: () =>
    document.querySelectorAll<HTMLElement>(".toc-diff-stats>strong")[1],
  addSpinnerToPage(spinner) {
    const container = this.getDeletionsElement()?.parentElement;
    container?.appendChild(spinner);
  },
  getAdditionsText: (count) => `${count} additions`,
  getDeletionsText: (count) => `${count} deletions`,
  getGeneratedText: (count) => `${count} generated lines.`,
});
