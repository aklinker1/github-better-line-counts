export const PrDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelector<HTMLElement>("#diffstat .color-fg-success"),
  getDeletionsElement: () =>
    document.querySelector<HTMLElement>("#diffstat .color-fg-danger"),
  addSpinnerToPage(spinner) {
    const deletions = this.getDeletionsElement();
    deletions?.replaceWith(deletions, spinner);
  },
  getAdditionsText: (count) => i18n.t("diffs_additionsSymbol", [count]),
  getDeletionsText: (count) => i18n.t("diffs_deletionsSymbol", [count]),
  getGeneratedText: (count) => " " + i18n.t("diffs_generatedSymbol", [count]),
});
