import { defineExtensionStorage } from "@webext-core/storage";

export interface ExtensionStorageSchema {
  /**
   * The user's personal access token (PAT).
   */
  githubPat: string | null;
  /**
   * When `true`, don't show the generated line counts next to additions and subtractions.
   */
  hideGeneratedLineCount: boolean;
}

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local
);
