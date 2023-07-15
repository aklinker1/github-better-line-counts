export function getCurrentRef(
  window: Pick<Window, "location"> = globalThis.window,
): string | undefined {
  const [_, ref] =
    window.location.pathname.match(/\/commit\/([0-9a-zA-Z]+?)(\/|$)/) ?? [];

  return ref;
}
