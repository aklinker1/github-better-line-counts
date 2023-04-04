import { defineExtensionStorage } from "@webext-core/storage";

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

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local,
);
