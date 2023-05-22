function createPrint(print: (...args: any[]) => void) {
  return (...args: any[]) => {
    const prefix = "%c+%c−";
    const styles = [
      "color: red; background-color: #0E1116; padding: 0 0 0 4px; border-radius: 2px 0 0 2px; font-weight: bold;",
      "color: green; background-color: #0E1116; padding: 0 4px 0 0; border-radius: 0 2px 2px 0; font-weight: bold;",
    ];
    print(prefix, ...styles, ...args);
  };
}

export const logger = {
  debug: createPrint(console.debug),
  log: createPrint(console.log),
  info: createPrint(console.info),
  warn: createPrint(console.warn),
  error: createPrint(console.error),
};
