import { describe, expect, it } from "vitest";
import { getCurrentCompare } from "../getCurrentCompare";
import { JSDOM } from "jsdom";

describe("getCurrentCompare", () => {
  it.each([
    [
      ["v1.5.2", "4443018"],
      "https://github.com/aklinker1/github-better-line-counts/compare/v1.5.2...4443018",
    ],
    [
      ["v1.5.2", "4443018"],
      "https://github.com/aklinker1/github-better-line-counts/compare/v1.5.2..4443018",
    ],
    [
      undefined,
      "https://github.com/aklinker1/github-better-line-counts/compare/...",
    ],
    [
      undefined,
      "https://github.com/aklinker1/github-better-line-counts/compare/...123",
    ],
    [
      undefined,
      "https://github.com/aklinker1/github-better-line-counts/compare/123...",
    ],
    [
      undefined,
      "https://github.com/aklinker1/github-better-line-counts/compare/",
    ],
  ])("should return the compared refs based on the URL", (expected, url) => {
    const jsdom = new JSDOM("", { url });

    expect(getCurrentCompare(jsdom.window)).toEqual(expected);
  });
});
