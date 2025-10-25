export const PrDiff = createDiffComponent({
  getAdditionsElement: () =>
    querySelectorFirst(
      // 2023
      "#diffstat .color-fg-success",
      // 2025-10-24
      "*[data-component=PH_Navigation] .f6.text-bold.fgColor-success",
    ),
  getDeletionsElement: () =>
    querySelectorFirst(
      // 2023
      "#diffstat .color-fg-danger",
      // 2025-10-24
      "*[data-component=PH_Navigation] .f6.text-bold.fgColor-danger",
    ),
  addSpinnerToPage(spinner) {
    const deletions = this.getDeletionsElement();
    deletions?.replaceWith(deletions, spinner);
  },
  getAdditionsText: (count) => i18n.t("diffs.additionsSymbol", [count]),
  getDeletionsText: (count) => i18n.t("diffs.deletionsSymbol", [count]),
  getGeneratedText: (count) => i18n.t("diffs.generatedSymbol", [count]),
});
