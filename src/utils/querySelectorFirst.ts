export function querySelectorFirst(
  ...selectors: Array<string | [selectAll: string, index: number]>
): HTMLElement | undefined {
  for (const selector of selectors) {
    const element = Array.isArray(selector)
      ? document.querySelectorAll<HTMLElement>(selector[0])[selector[1]]
      : document.querySelector<HTMLElement>(selector);
    if (element) return element;
  }
}
