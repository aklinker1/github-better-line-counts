import { registerGithubApi } from "./utils/github";

registerGithubApi();

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") browser.runtime.openOptionsPage();
});
