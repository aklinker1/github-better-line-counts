export const CommitDiff = createDiffComponent({
  getAdditionsElement: () =>
    querySelectorFirst(
      // 2023
      "#toc>*>strong:nth-child(2)",
      // 2025-10-24
      "#diff-content-parent .fgColor-success",
    ),
  getDeletionsElement: () =>
    querySelectorFirst(
      // 2023
      "#toc>*>strong:nth-child(3)",
      // 2025-10-24
      "#diff-content-parent .fgColor-danger",
    ),
  addSpinnerToPage(spinner) {
    this.getDeletionsElement()?.after(spinner);
  },
  getAdditionsText: (count) => i18n.t("diffs.additionsText", count),
  getDeletionsText: (count) => i18n.t("diffs.deletionsText", count),
  getGeneratedText: (count) => i18n.t("diffs.generatedText", [count]),
});
