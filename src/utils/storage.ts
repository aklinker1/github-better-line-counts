import { defineExtensionStorage } from "@webext-core/storage";

export interface ExtensionStorageSchema {
  /**
   * The user's personal access token (PAT).
   */
  githubPat: string | null;
}

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local
);
