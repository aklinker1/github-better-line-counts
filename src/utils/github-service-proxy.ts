import { createProxyService } from "@webext-core/proxy-service";
import type { GithubService } from "./github/service";

export const GITHUB_SERVICE_PROXY_KEY = "github";

export const githubProxy = createProxyService<GithubService>(
  GITHUB_SERVICE_PROXY_KEY,
);
