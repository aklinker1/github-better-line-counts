export function getCurrentOwner(
  window: Pick<Window, "location"> = globalThis.window,
): string | undefined {
  const [_, owner] =
    window.location.href.match(/github\.com\/(.*?)(\/|$)/) ?? [];

  return owner;
}
