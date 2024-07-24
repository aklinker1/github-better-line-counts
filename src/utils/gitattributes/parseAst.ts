import type { Token } from "./tokenize";

export function parseAst(tokens: Token[]): Node[] {
  const nodes: Node[] = [];
  let currentNode: Node | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.token === "\n") {
      if (currentNode) nodes.push(currentNode);
    } else if (token.token === "#") {
      i++;
      const comment: Comment = {
        type: "comment",
        text: "",
        line: token.line,
        column: token.column,
      };
      while (i < tokens.length && tokens[i].token !== "\n") {
        comment.text += tokens[i].token;
        i++;
      }
      i--;
      comment.text = comment.text.trim();
      nodes.push(comment);
    } else {
      const rule: Rule = {
        type: "rule",
        pattern: token.token,
        attributes: [],
        column: token.column,
        line: token.line,
      };

      i++;
      while (
        i < tokens.length &&
        tokens[i].token !== "#" &&
        tokens[i].token !== "\n"
      ) {
        const attrToken = tokens[i];

        switch (attrToken.token) {
          case "!":
            rule.attributes.push({
              name: tokens[i + 1].token,
              value: undefined,
              line: attrToken.line,
              column: attrToken.column,
            });
            i++;
            break;
          case "-":
            const name = tokens[i + 1].token;
            rule.attributes.push({
              name,
              value: false,
              line: attrToken.line,
              column: attrToken.column,
            });
            i++;
            break;
          default:
            const attr: Attribute = {
              name: attrToken.token,
              value: true,
              line: attrToken.line,
              column: attrToken.column,
            };

            const nextToken = tokens[i + 1]?.token;
            const valueToken = tokens[i + 2]?.token ?? "";
            if (nextToken === "=") {
              attr.value =
                valueToken === "true"
                  ? true
                  : valueToken === "false"
                    ? false
                    : valueToken;
              i += 2;
            }
            rule.attributes.push(attr);
            break;
        }
        i++;
      }
      i--;

      nodes.push(rule);
    }
  }

  return nodes;
}

export type Node = Comment | Rule;

export interface Comment {
  type: "comment";
  text: string;
  line: number;
  column: number;
}

export interface Rule {
  type: "rule";
  pattern: string;
  line: number;
  column: number;
  attributes: Attribute[];
}

export interface Attribute {
  name: string;
  value: boolean | string | undefined;
  line: number;
  column: number;
}
