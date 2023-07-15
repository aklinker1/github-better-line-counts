import { DEFAULT_CUSTOM_LIST_ALL } from "../utils/constants";
import { registerGithubService, createGithubApi } from "../utils/github";
import { extensionStorage } from "../utils/storage";

export default defineBackground(() => {
  const api = createGithubApi();
  registerGithubService(api);

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
