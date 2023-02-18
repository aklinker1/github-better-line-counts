export function done() {
  console.log(`${green("✓")} Done.`);
}

export function green(text: string): string {
  return `\x1b[32m${text}\x1b[0m`;
}
export function cyan(text: string): string {
  return `\x1b[36m${text}\x1b[0m`;
}
