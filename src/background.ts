import { registerGithubService, createGithubApi } from "@/utils/github";

const api = createGithubApi();
registerGithubService(api);

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    void chrome.runtime.openOptionsPage();
  }
});
