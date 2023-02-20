import { tokenize } from "./tokenize";
import { Attribute, Node, parseAst, Rule } from "./parseAst";
import minimatch from "minimatch";

export class GitAttributes {
  ast: Node[];

  constructor(readonly text: string) {
    const tokens = tokenize(text);
    this.ast = parseAst(tokens);
  }

  evaluate(file: string): FileEvaluation {
    const rules = this.ast.filter((node) => node.type === "rule") as Rule[];
    const res: FileEvaluation = {
      attributes: {},
      appliedRules: [],
    };

    for (const rule of rules) {
      const globPattern = this.getGlobPattern(rule.pattern);
      const isMatch = minimatch(file, globPattern, {
        dot: true, // Allow matching with files that start with "."
      });
      if (isMatch) {
        rule.attributes.forEach((attr) => {
          res.attributes[attr.name] = attr.value;
        });
        res.appliedRules.push(rule);
      }
    }
    return res;
  }

  /**
   * Given a gitattributes pattern, change it to a glob patternt that works with minimatch.
   */
  private getGlobPattern(pattern: string): string {
    return pattern.startsWith("/") ? pattern : `**/${pattern}`;
  }
}

export interface FileEvaluation {
  attributes: Record<string, Attribute["value"]>;
  appliedRules: Rule[];
}
