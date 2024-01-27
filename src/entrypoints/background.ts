import { registerGithubService, createGithubApi } from "@/utils/github";

export default defineBackground(() => {
  const api = createGithubApi();
  registerGithubService(api);

  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === "install") {
      void browser.runtime.openOptionsPage();
    }
  });
});
