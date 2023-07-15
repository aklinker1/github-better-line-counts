export function getCurrentCompare(
  window: Pick<Window, "location"> = globalThis.window,
): [string, string] | undefined {
  const [_, ref1, ref2] =
    window.location.pathname.match(/\/compare\/(\S+?)\.{2,3}(\S+?)(\/|$)/) ??
    [];

  if (!ref1 || ref1 === "." || !ref2 || ref2 === ".") return undefined;
  return [ref1, ref2];
}
