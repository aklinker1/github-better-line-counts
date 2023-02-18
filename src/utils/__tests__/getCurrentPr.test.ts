import { describe, expect, it } from "vitest";
import { getCurrentPr } from "../getCurrentPr";
import { JSDOM } from "jsdom";

describe("getCurrentPr", () => {
  it.each([
    [
      271,
      "https://github.com/anime-skip/player/pull/271/commits/10fa8a5c6505de78f090195c0035fe3d42b8484b",
    ],
    [271, "https://github.com/anime-skip/player/pull/271"],
  ])("should return the owner based on the URL", (expected, url) => {
    const jsdom = new JSDOM("", {
      url,
    });

    expect(getCurrentPr(jsdom.window)).toEqual(expected);
  });
});
