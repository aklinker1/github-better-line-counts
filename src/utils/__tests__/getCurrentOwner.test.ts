import { describe, expect, it } from "vitest";
import { getCurrentOwner } from "../getCurrentOwner";
import { JSDOM } from "jsdom";

describe("getCurrentOwner", () => {
  it.each([
    [
      "anime-skip",
      "https://github.com/anime-skip/player/pull/271/commits/10fa8a5c6505de78f090195c0035fe3d42b8484b",
    ],
    ["anime-skip", "https://github.com/anime-skip/player"],
    ["anime-skip", "https://github.com/anime-skip/player?ref=test"],
    ["anime-skip", "https://github.com/anime-skip"],
    ["anime-skip", "https://github.com/anime-skip?ref=test"],
  ])("should return the owner based on the URL", (expected, url) => {
    const jsdom = new JSDOM("", { url });

    expect(getCurrentOwner(jsdom.window)).toEqual(expected);
  });
});
