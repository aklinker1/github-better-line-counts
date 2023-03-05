import { Github } from "../utils/github";
import { extensionStorage } from "../utils/storage";
import { Spinner } from "./Spinner";

const greyColor = "var(--color-fg-muted)";

export async function DiffStat(
  statsPromise: Promise<Github.RecalculateResult>,
) {
  const hideGeneratedLineCountPromise = extensionStorage.getItem(
    "hideGeneratedLineCount",
  );

  // Render loading UI while calculating stats

  let deletions = getDeletionsElement();
  if (!deletions) return;

  const spinner = Spinner(greyColor);
  if (deletions) {
    deletions.replaceWith(deletions, spinner);
  }

  // Wait for calculation and settings to load

  const [stats, hideGeneratedLineCount] = await Promise.all([
    statsPromise,
    hideGeneratedLineCountPromise,
  ]);

  // Render new counts

  let additions = getAdditionsElement();
  if (!additions) return;

  additions.textContent = `+${stats?.include.additions}`;
  deletions.textContent = `−${stats?.include.deletions}`;

  if (!hideGeneratedLineCount) {
    const generated = document.createElement("span");
    generated.style.color = greyColor;
    generated.textContent = ` ⌁${stats?.exclude.changes}`;
    generated.title = `${stats?.exclude.changes} lines generated`;
    spinner.replaceWith(generated);
  }
}

const getAdditionsElement = () =>
  document.querySelector<HTMLElement>("#diffstat .color-fg-success");

const getDeletionsElement = () =>
  document.querySelector<HTMLElement>("#diffstat .color-fg-danger");
