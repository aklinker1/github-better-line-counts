import { defineProxyService } from "@webext-core/proxy-service";
import { ofetch, $Fetch, FetchError } from "ofetch";
import { extensionStorage } from "../storage";
import {
  Commit,
  DiffEntry,
  DiffSummary,
  EncodedFile,
  PullRequest,
  RecalculateCommitOptions,
  RecalculateCompareOptions,
  RecalculateOptions,
  RecalculatePrOptions,
  RecalculateResult,
  User,
} from "./types";
import { HOUR } from "../time";
import { GitAttributes } from "../gitattributes";
import minimatch from "minimatch";
import { commitHashDiffsCache } from "../global-cache";
import { logger } from "../logger";

class GithubApi {
  private static async getFetch(token?: string | null): Promise<$Fetch> {
    const headers: Record<string, string> = {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    };

    // A PAT is required for private repos
    // https://github.com/settings/tokens/new?description=Simple%20GitHub&20Diffs&scopes=repo
    token ??= await extensionStorage.getItem("githubPat");
    if (token) headers.Authorization = `Bearer ${token}`;

    return ofetch.create({
      baseURL: "https://api.github.com",
      headers,
    });
  }

  cache = commitHashDiffsCache;

  /**
   * Throws an error if the PAT is not valid
   */
  async getUser(token: string): Promise<User> {
    const fetch = await GithubApi.getFetch(token);
    return await fetch<User>("/user");
  }

  async recalculateDiff(
    options: RecalculateOptions,
  ): Promise<RecalculateResult> {
    const ref = await this.getCurrentCommit(options);
    const cached = await this.cache.get(ref);
    if (cached) {
      logger.debug("[recalculateDiff] Using cached result");
      return cached;
    }

    // 10s sleep for testing loading UI
    // await sleep(10e3);

    const [gitAttributes, changedFiles, settingsPatterns] = await Promise.all([
      this.getGitAttributes({ ...options, ref }),
      options.type === "pr"
        ? this.getPrFiles(options)
        : options.type === "commit"
        ? this.getCommitFiles(options)
        : this.getCompareFiles(options),
      this.getPatternsFromSettings(),
    ]);

    const include: DiffEntry[] = [];
    const exclude: DiffEntry[] = [];
    changedFiles.forEach((diff) => {
      if (gitAttributes == null) {
        include.push(diff);
        return;
      }

      const gitAttributesEval = gitAttributes.evaluate(diff.filename);
      const matchingSettings = settingsPatterns.filter(({ pattern }) =>
        minimatch(diff.filename, pattern),
      );
      const isGitAttributesGenerated =
        !!gitAttributesEval.attributes["linguist-generated"];
      const isSettingsGenerated = matchingSettings.length > 0;
      const isGenerated = isGitAttributesGenerated || isSettingsGenerated;

      logger.debug("Is generated?", diff.filename, {
        isGitAttributesGenerated,
        isSettingsGenerated,
        isGenerated,
      });
      logger.debug("Git attributes evaluation:", gitAttributesEval);
      logger.debug("Matched settings:", isSettingsGenerated);

      if (isGenerated) exclude.push(diff);
      else include.push(diff);
    });

    const result: RecalculateResult = {
      all: this.calculateDiffForFiles(changedFiles),
      exclude: this.calculateDiffForFiles(exclude),
      include: this.calculateDiffForFiles(include),
    };
    await this.cache.set(ref, result, 2 * HOUR);
    return result;
  }

  /**
   * Returns a list of generated files that should be excluded from diff counts.
   *
   * Eventually, this will be based on your .gitattributes file.
   */
  private async getGitAttributes({
    ref,
    repo,
    owner,
  }: {
    ref: string;
    repo: string;
    owner: string;
  }): Promise<GitAttributes | undefined> {
    const fetch = await GithubApi.getFetch();

    try {
      const encodedFile = await fetch<EncodedFile>(
        `/repos/${owner}/${repo}/contents/.gitattributes`,
        {
          query: { ref },
        },
      );
      logger.debug(encodedFile);
      const text = atob(encodedFile.content);
      const gitAttributes = new GitAttributes(text);
      logger.debug("Git Attributes:");
      logger.debug(gitAttributes.text);
      logger.debug(gitAttributes.ast);
      return gitAttributes;
    } catch (err) {
      if (err instanceof FetchError && err.statusCode === 404) {
        logger.debug("No .gitattributes file for this repo");
      } else {
        logger.error("Unknown error while loading gitattributes:", err);
      }
      return undefined;
    }
  }

  private async getPatternsFromSettings(): Promise<
    Array<{ source: string; pattern: string }>
  > {
    const res = await extensionStorage.getItem("customLists");
    if (!res) return [];

    const { all } = res;
    return all.split("\n").map((line) => ({
      pattern: line,
      source: "Options: All Repos",
    }));
  }

  /**
   * Get the commit hash for the current page. Used to look up gitattributes.
   */
  private async getCurrentCommit(options: RecalculateOptions): Promise<string> {
    const { owner, repo, type } = options;
    const fetch = await GithubApi.getFetch();

    if (type === "pr") {
      const fullPr = await fetch<PullRequest>(
        `/repos/${owner}/${repo}/pulls/${options.pr}`,
      );
      logger.debug("Full PR:", fullPr);
      return fullPr.head.sha;
    }

    if (type === "commit") {
      const fullCommit = await fetch<Commit>(
        `/repos/${owner}/${repo}/commits/${options.ref}`,
      );
      logger.debug("Full commit:", fullCommit);
      return fullCommit.sha;
    }

    throw Error("Not implemented: " + options.type);
  }

  /**
   * List all the files in a PR, paginating through to load all of them. Each file includes a count,
   * which will be used to recompute the diff.
   */
  private async getPrFiles(
    options: RecalculatePrOptions,
  ): Promise<DiffEntry[]> {
    const { owner, repo, pr } = options;
    const fetch = await GithubApi.getFetch();

    const results: DiffEntry[] = [];
    let pageResults: DiffEntry[] = [];
    let page = 1;
    const perPage = 100;

    do {
      logger.debug("Fetching PR page:", page);
      pageResults = await fetch<DiffEntry[]>(
        `/repos/${owner}/${repo}/pulls/${pr}/files?page=${page}&per_page=${perPage}`,
      );
      results.push(...pageResults);
      page++;
    } while (pageResults.length === perPage);

    logger.debug("Found", results.length, "files");
    return results;
  }

  /**
   * List all the files in a commit, paginating through to load all of them. Each file includes a count,
   * which will be used to recompute the diff.
   */
  private async getCommitFiles(
    options: RecalculateCommitOptions,
  ): Promise<DiffEntry[]> {
    throw Error;
  }

  /**
   * List all the files in a commit, paginating through to load all of them. Each file includes a count,
   * which will be used to recompute the diff.
   */
  private async getCompareFiles(
    options: RecalculateCompareOptions,
  ): Promise<DiffEntry[]> {
    throw Error;
  }

  private calculateDiffForFiles(files: DiffEntry[]): DiffSummary {
    let changes = 0,
      additions = 0,
      deletions = 0;

    for (const file of files) {
      changes += file.changes;
      additions += file.additions;
      deletions += file.deletions;
    }

    return { changes, additions, deletions };
  }
}

export const [registerGithubApi, getGithubApi] = defineProxyService(
  "GithubApi",
  () => new GithubApi(),
);
