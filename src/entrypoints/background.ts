import { createGithubApi, createGithubService } from "@/utils/github";
import { registerService } from "@webext-core/proxy-service";

export default defineBackground({
  type: "module",
  main: () => {
    const githubApi = createGithubApi();
    const githubService = createGithubService(githubApi);
    registerService(GITHUB_SERVICE_PROXY_KEY, githubService);

    browser.runtime.onInstalled.addListener(async ({ reason }) => {
      if (reason === "install") {
        void browser.runtime.openOptionsPage();
      }
    });
  },
});
