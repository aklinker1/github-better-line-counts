import { describe, expect, it } from "vitest";
import { getCurrentRef } from "../getCurrentRef";
import { JSDOM } from "jsdom";

describe("getCurrentRef", () => {
  it.each([
    ["123", "https://github.com/anime-skip/player/commit/123"],
    ["456", "https://github.com/anime-skip/player/commit/456?test=789"],
    [undefined, "https://github.com/anime-skip/player/commit/"],
    [undefined, "https://github.com/anime-skip/player/commit"],
  ])("should return the ref based on the URL", (expected, url) => {
    const jsdom = new JSDOM("", { url });

    expect(getCurrentRef(jsdom.window)).toEqual(expected);
  });
});
