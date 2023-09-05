import { registerGithubService, createGithubApi } from "@/utils/github";

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
  const defaultToken = import.meta.env.VITE_DEFAULT_TOKEN;
  if (defaultToken) await extensionStorage.setItem("githubPat", defaultToken);

  await extensionStorage.setItem("customLists", {
    all: DEFAULT_CUSTOM_LIST_ALL,
  });
}
