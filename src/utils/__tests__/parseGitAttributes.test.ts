import { describe, it, expect } from "vitest";
import { GlobPattern, parseGitAttributes } from "../parseGitAttributes";

describe("parseGitAttributes", () => {
  it("should ignore comments", () => {
    const content = "# some comment";

    const actual = parseGitAttributes(content);

    expect(actual).toEqual([]);
  });

  it("should return the correct glob patterns for a relative entry", () => {
    const content = "@types/auto-imports.d.ts linguist-generated=true";
    const expected: GlobPattern[] = [
      { pattern: "**/@types/auto-imports.d.ts", exclude: false },
    ];

    const actual = parseGitAttributes(content);

    expect(actual).toEqual(expected);
  });

  it("should return the correct glob patterns for an absolute entry", () => {
    const content = "/@types/auto-imports.d.ts linguist-generated=true";
    const expected: GlobPattern[] = [
      { pattern: "/@types/auto-imports.d.ts", exclude: false },
    ];

    const actual = parseGitAttributes(content);

    expect(actual).toEqual(expected);
  });

  it("return 'exclude: true' for 'linguist-generated=false'", () => {
    const content = "examples.ts linguist-generated=false";
    const expected: GlobPattern[] = [
      { pattern: "**/examples.ts", exclude: true },
    ];

    const actual = parseGitAttributes(content);

    expect(actual).toEqual(expected);
  });

  it("should parse multiple lines", () => {
    const content = `
    *.gen.html linguist-generated
    pnpm-lock.yaml linguist-generated
    `;
    const expected: GlobPattern[] = [
      { pattern: "**/*.gen.html", exclude: false },
      { pattern: "**/pnpm-lock.yaml", exclude: false },
    ];

    const actual = parseGitAttributes(content);

    expect(actual).toEqual(expected);
  });
});
