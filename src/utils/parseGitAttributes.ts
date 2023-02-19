export interface GlobPattern {
  pattern: string;
  exclude: boolean;
}

/**
 * Returns a list of glob patterns that idenify if a
 */
export function parseGitAttributes(text: string): GlobPattern[] {
  const res: GlobPattern[] = [];
  const lines = getGeneratedLines(text);

  for (const line of lines) {
    const attrIndex = line.indexOf("linguist-generated");
    const linePattern = line.slice(0, attrIndex).trim();
    const attr = line.slice(attrIndex).trim().replace(/\s/gm, "");

    const pattern = getGlobPattern(linePattern);
    res.push({
      pattern,
      exclude: attr === "linguist-generated=false",
    });
  }

  return res;
}

function getGeneratedLines(text: string): string[] {
  return (
    text
      .split("\n")
      // Remove comments
      .map((line) => line.split("#")[0].trim())
      // Remove blank lines
      .filter((line) => line.includes("linguist-generated"))
  );
}

function getGlobPattern(line: string): string {
  return line.startsWith("/") ? line : `**/${line}`;
}
