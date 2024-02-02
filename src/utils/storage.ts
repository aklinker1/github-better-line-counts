export interface CustomLists {
  all: string;
}

export interface ExtensionStorageSchema {
  /**
   * The user's personal access token (PAT).
   */
  githubPat: string | null;
  /**
   * When `true`, don't show the generated line counts next to additions and subtractions.
   */
  hideGeneratedLineCount: boolean;
  /**
   * When `true`, don't show the generated line counts next to additions and subtractions.
   */
  customLists: {
    all: string;
  };
}

export const githubPatStorage = storage.defineItem<string>("local:githubPat", {
  defaultValue: import.meta.env.VITE_DEFAULT_TOKEN ?? "",
});

export const hideGeneratedLineCountStorage = storage.defineItem<boolean>(
  "local:hideGeneratedLineCount",
  { defaultValue: false },
);

export const customListsStorage = storage.defineItem<{ all: string }>(
  "local:customLists",
  {
    defaultValue: {
      all: `*.lock\n*.lock.*\n*-lock*`,
    },
  },
);
