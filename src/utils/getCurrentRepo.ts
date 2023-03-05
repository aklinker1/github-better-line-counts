export function getCurrentRepo(
  window: Pick<Window, "location"> = globalThis.window,
): string | undefined {
  const [_, repo] =
    window.location.href.match(/github\.com\/.+?\/(.*?)(\/|$)/) ?? [];

  return repo;
}
