export function getCurrentRef(
  window: Pick<Window, "location"> = globalThis.window,
): string | undefined {
  const [_, ref] =
    window.location.pathname.match(/\/commit\/(\S+?)(\/|$)/) ?? [];

  return ref;
}
