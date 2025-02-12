import { i18n } from "@/utils/i18n";
import { createDiffComponent } from "./createDiffComponent";

export const CommitDiff = createDiffComponent({
  getAdditionsElement: () =>
    document.querySelector<HTMLElement>("#toc>*>strong:nth-child(2)"),
  getDeletionsElement: () =>
    document.querySelector<HTMLElement>("#toc>*>strong:nth-child(3)"),
  addSpinnerToPage(spinner) {
    const container = this.getDeletionsElement()?.parentElement;
    container?.appendChild(spinner);
  },
  getAdditionsText: (count) => i18n.t("diffs.additionsText", count),
  getDeletionsText: (count) => i18n.t("diffs.deletionsText", count),
  getGeneratedText: (count) => i18n.t("diffs.generatedText", count),
});
