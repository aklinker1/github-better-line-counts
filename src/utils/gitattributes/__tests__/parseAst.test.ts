import { describe, it, expect } from "vitest";
import { Node, parseAst } from "../parseAst";
import { Token } from "../tokenize";

describe("parseAst", () => {
  it("should return the correct AST for no tokens", () => {
    const input: Token[] = [];
    const expected: Node[] = [];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for no attributes", () => {
    const input: Token[] = [{ token: "package.json", line: 1, column: 1 }];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for a single attribute", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: true, line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for a multiple attributes", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
      { token: "eol", line: 1, column: 25 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [
          {
            name: "text",
            value: true,
            line: 1,
            column: 20,
          },
          {
            name: "eol",
            value: true,
            line: 1,
            column: 25,
          },
        ],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for multiple lines", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
      { token: "\n", line: 1, column: 24 },
      { token: "pnpm-lock.yaml", line: 2, column: 1 },
      { token: "eol", line: 2, column: 25 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: true, line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
      {
        type: "rule",
        pattern: "pnpm-lock.yaml",
        attributes: [{ name: "eol", value: true, line: 2, column: 25 }],
        line: 2,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for the ! prefix", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "!", line: 1, column: 20 },
      { token: "text", line: 1, column: 21 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: undefined, line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for the - prefix", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "-", line: 1, column: 20 },
      { token: "text", line: 1, column: 21 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: false, line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for the =true setter", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
      { token: "=", line: 1, column: 24 },
      { token: "true", line: 1, column: 25 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: true, line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for the =false setter", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
      { token: "=", line: 1, column: 24 },
      { token: "false", line: 1, column: 25 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: false, line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for the ={text} setter", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
      { token: "=", line: 1, column: 24 },
      { token: "other", line: 1, column: 25 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: "other", line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });

  it("should return the correct AST for setting a value equal to nothing", () => {
    const input: Token[] = [
      { token: "package.json", line: 1, column: 1 },
      { token: "text", line: 1, column: 20 },
      { token: "=", line: 1, column: 24 },
    ];
    const expected: Node[] = [
      {
        type: "rule",
        pattern: "package.json",
        attributes: [{ name: "text", value: "", line: 1, column: 20 }],
        line: 1,
        column: 1,
      },
    ];

    expect(parseAst(input)).toEqual(expected);
  });
});
