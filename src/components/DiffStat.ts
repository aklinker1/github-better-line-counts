import { Github } from "../utils/github";
import { extensionStorage } from "../utils/storage";

export function DiffStat(statsPromise: Promise<Github.RecalculateResult>) {
  let stats: Github.RecalculateResult | undefined;
  const hideGeneratedLineCountPromise = extensionStorage.getItem(
    "hideGeneratedLineCount"
  );
  let hideGeneratedLineCount: boolean | null = null;

  const additionsSelector = "#diffstat .color-fg-success";
  const deletionsSelector = "#diffstat .color-fg-danger";

  const render = () => {
    const additionsElement =
      document.querySelector<HTMLElement>(additionsSelector);
    const deletionsElement =
      document.querySelector<HTMLElement>(deletionsSelector);
    const generatedElement = document.createElement("span");

    if (!additionsElement || !deletionsElement) return;

    if (stats == null) {
      additionsElement.style.display = "none";

      deletionsElement.style.display = "none";
    } else {
      additionsElement.style.removeProperty("display");
      additionsElement.textContent = `+${stats?.include.additions}`;

      deletionsElement.style.removeProperty("display");
      deletionsElement.textContent = `−${stats?.include.deletions}`;

      if (!hideGeneratedLineCount) {
        generatedElement.style.color = "var(--color-fg-muted)";
        generatedElement.textContent = ` ⌁${stats?.exclude.changes}`;
        generatedElement.title = `${stats?.exclude.changes} lines generated`;
        deletionsElement.replaceWith(deletionsElement, generatedElement);
      }
    }
  };

  render();
  Promise.all([statsPromise, hideGeneratedLineCountPromise]).then(
    ([newStats, newHideGeneratedLineCount]) => {
      stats = newStats;
      hideGeneratedLineCount = newHideGeneratedLineCount;
      render();
    }
  );
}
