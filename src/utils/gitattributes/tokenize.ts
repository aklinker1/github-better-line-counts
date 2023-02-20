export function tokenize(text: string): Token[] {
  let lineIndex = 0;
  let columnIndex = 0;
  let isComment = false;
  let isInQuotes = false;
  let isEscaped = false;
  let escapeCount = 0;
  let isPattern = false;
  const newToken = (): Token => ({
    token: "",
    line: lineIndex + 1,
    column: columnIndex + 1,
  });

  const tokens: Token[] = [];
  let currentToken: Token | null = null;
  const addCurrentToken = () => {
    if (currentToken?.token) tokens.push(currentToken);
    currentToken = null;
  };

  const lines = text.split("\n");
  for (lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const isLastLine = lineIndex === lines.length - 1;
    const line = lines[lineIndex] + (isLastLine ? "" : "\n");
    isPattern = true;

    for (columnIndex = 0; columnIndex < line.length; columnIndex++) {
      const char = line[columnIndex];
      currentToken ??= newToken();

      switch (char) {
        case "#":
          if (isComment || isInQuotes || isEscaped) {
            currentToken.token += char;
          } else {
            isComment = true;
            addCurrentToken();
            tokens.push({
              token: char,
              line: lineIndex + 1,
              column: columnIndex + 1,
            });
          }
          break;

        case "\n":
          isComment = false;
          isInQuotes = false;
          isEscaped = false;
          escapeCount = 0;
          addCurrentToken();
          tokens.push({
            token: char,
            line: lineIndex + 1,
            column: columnIndex + 1,
          });
          break;

        case '"':
        case "'":
          if (isComment || isEscaped) {
            currentToken.token += char;
          } else if (isInQuotes) {
            isInQuotes = false;
          } else {
            isInQuotes = true;
          }
          break;

        case " ":
          if (isComment || isInQuotes || isEscaped) {
            currentToken.token += char;
          } else {
            addCurrentToken();
            isPattern = false;
          }
          break;

        case "=":
          if (isPattern || isComment || isInQuotes || isEscaped) {
            currentToken.token += char;
          } else {
            addCurrentToken();
            tokens.push({
              token: char,
              line: lineIndex + 1,
              column: columnIndex + 1,
            });
          }
          break;

        case "-":
        case "!":
          const isPrefix = currentToken.token.length === 0;
          if (isPattern || isComment || isInQuotes || isEscaped || !isPrefix) {
            currentToken.token += char;
          } else {
            addCurrentToken();
            tokens.push({
              token: char,
              line: lineIndex + 1,
              column: columnIndex + 1,
            });
          }
          break;

        case "\\":
          if (isEscaped) {
            currentToken.token += char;
          } else {
            isEscaped = true;
            escapeCount = 0;
          }
          break;
        default:
          currentToken.token += char;
      }

      if (isEscaped) {
        escapeCount++;
        if (escapeCount == 2) {
          isEscaped = false;
          escapeCount = 0;
        }
      }
    }
  }

  addCurrentToken();

  return tokens;
}

export interface Token {
  token: string;
  line: number;
  column: number;
}
