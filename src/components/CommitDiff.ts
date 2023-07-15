export const CommitDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelector<HTMLElement>("#toc>*>strong:nth-child(2)"),
  getDeletionsElement: () =>
    document.querySelector<HTMLElement>("#toc>*>strong:nth-child(3)"),
  addSpinnerToPage(spinner) {
    const container = this.getDeletionsElement()?.parentElement;
    container?.appendChild(spinner);
  },
  getAdditionsText: (count) => `${count} additions`,
  getDeletionsText: (count) => `${count} deletions`,
  getGeneratedText: (count) => `${count} generated lines.`,
});
