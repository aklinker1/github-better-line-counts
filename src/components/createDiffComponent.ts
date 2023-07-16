import { RecalculateResult } from "@/utils/github";

export function createDiffComponent(options: {
  getAdditionsElement: () => HTMLElement | null | undefined;
  getDeletionsElement: () => HTMLElement | null | undefined;
  addSpinnerToPage: (spinner: HTMLElement) => void;
  getAdditionsText: (count: number) => string;
  getDeletionsText: (count: number) => string;
  getGeneratedText: (count: number) => string;
}): (statsPromise: Promise<RecalculateResult>) => Promise<void> {
  return async (statsPromise) => {
    const hideGeneratedLineCountPromise = extensionStorage.getItem(
      "hideGeneratedLineCount",
    );

    const spinner = Spinner(GREY_COLOR);
    spinner.id = DIFF_COMPONENT_ID;
    options.addSpinnerToPage(spinner);

    // Wait for calculation and settings to load

    const [stats, hideGeneratedLineCount] = await Promise.all([
      statsPromise,
      hideGeneratedLineCountPromise,
    ]);

    // Render new counts

    const additions = options.getAdditionsElement();
    console.log({ additions });
    if (!additions) return;

    const deletions = options.getDeletionsElement();
    console.log({ deletions });
    if (!deletions) return;

    additions.textContent = options.getAdditionsText(stats.include.additions);
    deletions.textContent = options.getDeletionsText(stats.include.deletions);

    if (!hideGeneratedLineCount) {
      const generated = document.createElement("strong");
      generated.id = DIFF_COMPONENT_ID;
      generated.textContent = options.getGeneratedText(stats.exclude.changes);
      generated.style.color = GREY_COLOR;
      spinner.replaceWith(generated);
    }
  };
}
