import { Github } from "../utils/github";
import { extensionStorage } from "../utils/storage";

export async function DiffStat(
  statsPromise: Promise<Github.RecalculateResult>
) {
  const hideGeneratedLineCountPromise = extensionStorage.getItem(
    "hideGeneratedLineCount"
  );

  // Render loading UI while calculating stats

  let additionsElement = getAdditionsElement();
  let deletionsElement = getDeletionsElement();

  if (additionsElement) additionsElement.style.display = "none";
  if (deletionsElement) deletionsElement.style.display = "none";

  // Wait for calculation and settings to load

  const [stats, hideGeneratedLineCount] = await Promise.all([
    statsPromise,
    hideGeneratedLineCountPromise,
  ]);

  // Render new counts

  additionsElement = getAdditionsElement();
  deletionsElement = getDeletionsElement();
  if (!additionsElement || !deletionsElement) return;

  additionsElement.style.removeProperty("display");
  additionsElement.textContent = `+${stats?.include.additions}`;

  deletionsElement.style.removeProperty("display");
  deletionsElement.textContent = `−${stats?.include.deletions}`;

  if (!hideGeneratedLineCount) {
    const generatedElement = document.createElement("span");
    generatedElement.style.color = "var(--color-fg-muted)";
    generatedElement.textContent = ` ⌁${stats?.exclude.changes}`;
    generatedElement.title = `${stats?.exclude.changes} lines generated`;
    deletionsElement.replaceWith(deletionsElement, generatedElement);
  }
}

const getAdditionsElement = () =>
  document.querySelector<HTMLElement>("#diffstat .color-fg-success");

const getDeletionsElement = () =>
  document.querySelector<HTMLElement>("#diffstat .color-fg-danger");
