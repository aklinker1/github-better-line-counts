import { describe, expect, it } from "vitest";
import { getCurrentRepo } from "../getCurrentRepo";
import { JSDOM } from "jsdom";

describe("getCurrentRepo", () => {
  it.each([
    [
      "player",
      "https://github.com/anime-skip/player/pull/271/commits/10fa8a5c6505de78f090195c0035fe3d42b8484b",
    ],
    [
      "player",
      "https://github.com/anime-skip/player/pull/271/commits/10fa8a5c6505de78f090195c0035fe3d42b8484b?test=123",
    ],
    ["player", "https://github.com/anime-skip/player"],
    ["player", "https://github.com/anime-skip/player?referrer=search"],
    [undefined, "https://github.com/anime-skip"],
    [undefined, "https://github.com/anime-skip/"],
  ])("should return the repo based on the URL", (expected, url) => {
    const jsdom = new JSDOM("", { url });

    expect(getCurrentRepo(jsdom.window)).toEqual(expected);
  });
});
