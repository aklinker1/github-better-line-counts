import { describe, expect, it } from "vitest";
import { getCurrentRepo } from "../getCurrentRepo";
import { JSDOM } from "jsdom";

describe("getCurrentRepo", () => {
  it("should return the repo based on the URL", () => {
    const url =
      "https://github.com/anime-skip/player/pull/271/commits/10fa8a5c6505de78f090195c0035fe3d42b8484b";
    const jsdom = new JSDOM("", {
      url,
    });

    expect(getCurrentRepo(jsdom.window)).toEqual("player");
  });
});
