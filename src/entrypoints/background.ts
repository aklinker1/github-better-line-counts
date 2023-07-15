import { DEFAULT_CUSTOM_LIST_ALL } from "../utils/constants";
import { registerGithubApi } from "../utils/github";
import { extensionStorage } from "../utils/storage";

export default defineBackground(() => {
  registerGithubApi();

  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === "install") {
      await initalizeStorage();
      void browser.runtime.openOptionsPage();
    }
  });
});

async function initalizeStorage() {
  await extensionStorage.setItem("customLists", {
    all: DEFAULT_CUSTOM_LIST_ALL,
  });
}
