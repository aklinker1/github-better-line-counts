import { describe, it, expect } from "vitest";
import { tokenize } from "../tokenize";

describe("tokenize", () => {
  it("should tokenize a single line", () => {
    const input = "package.json     text";
    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 18 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize multiple lines", () => {
    const input = `package.json     text
pnpm-lock.lock linguist-generated`;

    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 18 },
      { token: "\n", line: 1, column: 22 },
      { token: "pnpm-lock.lock", line: 2, column: 1 },
      { token: "linguist-generated", line: 2, column: 16 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize multiple attributes", () => {
    const input = `package.json     text linguist-generated`;

    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 18 },
      { token: "linguist-generated", line: 1, column: 23 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize fully quoted paths correctly", () => {
    const input = `"some dir" text`;

    const expected = [
      { token: "some dir", line: 1, column: 1 },
      { token: "text", line: 1, column: 12 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize internal quotes correctly", () => {
    const input = `some/"path to"/a-dir text`;

    const expected = [
      { token: "some/path to/a-dir", line: 1, column: 1 },
      { token: "text", line: 1, column: 22 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize single quotes as well", () => {
    const input = `some/'path to'/dir text`;

    const expected = [
      { token: "some/path to/dir", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize ! prefixes", () => {
    const input = "package.json     !text";
    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "!", line: 1, column: 18 },
      { token: "text", line: 1, column: 19 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize - prefixes", () => {
    const input = "package.json     -text";
    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "-", line: 1, column: 18 },
      { token: "text", line: 1, column: 19 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize = values", () => {
    const input = "package.json     text=lf";
    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 18 },
      { token: "=", line: 1, column: 22 },
      { token: "lf", line: 1, column: 23 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize full line comments correctly", () => {
    const input = "# Comment text";
    const expected = [
      { token: "#", line: 1, column: 1 },
      { token: " Comment text", line: 1, column: 2 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });

  it("should tokenize end of line comments correctly", () => {
    const input = "package.json # Comment text";
    const expected = [
      { token: "package.json", line: 1, column: 1 },
      { token: "#", line: 1, column: 14 },
      { token: " Comment text", line: 1, column: 15 },
    ];

    expect(tokenize(input)).toEqual(expected);
  });
});
