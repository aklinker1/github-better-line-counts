export function getCurrentOwner(
  window: Pick<Window, "location"> = globalThis.window,
): string | undefined {
  const [_, owner] = window.location.pathname.match(/\/(.+?)(\/|$)/) ?? [];
  console.log(window.location.pathname);

  return owner;
}
