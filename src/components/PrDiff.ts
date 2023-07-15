export const PrDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelector<HTMLElement>("#diffstat .color-fg-success"),
  getDeletionsElement: () =>
    document.querySelector<HTMLElement>("#diffstat .color-fg-danger"),
  addSpinnerToPage(spinner) {
    const deletions = this.getDeletionsElement();
    deletions?.replaceWith(deletions, spinner);
  },
  getAdditionsText: (count) => `+${count}`,
  getDeletionsText: (count) => `−${count}`,
  getGeneratedText: (count) => ` ⌁${count}`,
});
