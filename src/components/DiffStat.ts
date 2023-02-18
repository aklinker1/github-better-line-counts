import { Github } from "../utils/github";

export function DiffStat(statsPromise: Promise<Github.DiffSummary>) {
  let stats: Github.DiffSummary | undefined;

  const additionsSelector = "#diffstat .color-fg-success";
  const additionsText = () => `+${stats?.additions}`;

  const deletionsSelector = "#diffstat .color-fg-danger";
  const deletionsText = () => `−${stats?.deletions}`;

  const render = () => {
    const additionsElement =
      document.querySelector<HTMLElement>(additionsSelector);
    const deletionsElement =
      document.querySelector<HTMLElement>(deletionsSelector);

    if (!additionsElement || !deletionsElement) return;

    if (stats == null) {
      additionsElement.style.display = "none";

      deletionsElement.style.display = "none";
    } else {
      additionsElement.style.removeProperty("display");
      additionsElement.textContent = additionsText();

      deletionsElement.style.removeProperty("display");
      deletionsElement.textContent = deletionsText();
    }
  };

  render();
  statsPromise.then((newStats) => {
    stats = newStats;
    render();
  });
}
