import { defineProxyService } from "@webext-core/proxy-service";
import type { GithubApi } from "./api";
import type { DiffEntry } from "./types";
import { minimatch } from "minimatch";
import { GitAttributes } from "../gitattributes";

export const [registerGithubService, getGithubService] = defineProxyService(
  "GithubService",
  createGithubService,
);

function createGithubService(api: GithubApi) {
  /**
   * Returns a list of generated files that should be excluded from diff counts.
   *
   * Eventually, this will be based on your .gitattributes file.
   */
  async function getGitAttributes(options: {
    ref: string;
    repo: string;
    owner: string;
  }): Promise<GitAttributes | undefined> {
    const text = await api.getGitAttributesFile(options);
    if (text === undefined) {
      logger.debug("No .gitattributes file for this repo and commit");
      return undefined;
    }
    const gitAttributes = new GitAttributes(text);
    logger.debug("Git Attributes:");
    logger.debug(gitAttributes.text);
    logger.debug(gitAttributes.ast);
    return gitAttributes;
  }

  async function getPatternsFromSettings(): Promise<
    Array<{ source: string; pattern: string }>
  > {
    const res = await customListsStorage.getValue();

    const { all } = res;
    return all.split("\n").map((line) => ({
      pattern: line,
      source: "Options: All Repos",
    }));
  }

  /**
   * Get the commit hash for the current page. Used to look up gitattributes.
   */
  async function getCurrentCommit(
    options: RecalculateOptions,
  ): Promise<string> {
    if (options.type === "pr") {
      const fullPr = await api.getPr(options);
      logger.debug("Full PR:", fullPr);
      return fullPr.head.sha;
    }

    if (options.type === "commit") {
      const fullCommit = await api.getCommit(options);
      logger.debug("Full commit:", fullCommit);
      return fullCommit.sha;
    }

    if (options.type === "compare") {
      const fullCommit = await api.getCommit({
        ...options,
        ref: options.commitRefs[0],
      });
      logger.debug("Full base commit:", fullCommit);
      return fullCommit.sha;
    }

    throw Error(
      `Not implemented: getCurrentCommit(${JSON.stringify(options)})`,
    );
  }

  function calculateDiffForFiles(files: DiffEntry[]): DiffSummary {
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

  async function getChangedFiles(
    options: RecalculateOptions,
  ): Promise<DiffEntry[]> {
    if (options.type === "pr") return api.getAllPrFiles(options);

    if (options.type === "commit") {
      const commit = await api.getCommit(options);
      return commit.files;
    }

    if (options.type === "compare") {
      const comparison = await api.compareCommits(options);
      return comparison.files;
    }

    throw Error(`Not implemented: getChangedFiles(${JSON.stringify(options)})`);
  }

  function getCacheKey(
    currentRef: string,
    options: RecalculateOptions,
  ): string {
    if (options.type === "compare") {
      return `${options.commitRefs[0]}...${options.commitRefs[1]}`;
    }
    return currentRef;
  }

  return {
    async recalculateDiff(
      options: RecalculateOptions,
    ): Promise<RecalculateResult> {
      const ref = await getCurrentCommit(options);
      const cacheKey = getCacheKey(ref, options);
      const cached = await commitHashDiffsCache.get(cacheKey);
      if (cached) {
        logger.debug("[recalculateDiff] Using cached result");
        return cached;
      }

      // 10s sleep for testing loading UI
      // await sleep(10e3);

      const [gitAttributes, changedFiles, settingsPatterns] = await Promise.all(
        [
          getGitAttributes({ ...options, ref }),
          getChangedFiles(options),
          getPatternsFromSettings(),
        ],
      );
      logger.debug(`Found ${changedFiles.length} files`);

      const include: DiffEntry[] = [];
      const exclude: DiffEntry[] = [];
      changedFiles.forEach((diff) => {
        const gitAttributesEval = gitAttributes?.evaluate(diff.filename);
        const matchingSettings = settingsPatterns.filter(({ pattern }) =>
          minimatch(diff.filename, pattern),
        );
        const isGitAttributesGenerated =
          !!gitAttributesEval?.attributes["linguist-generated"];
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
        all: calculateDiffForFiles(changedFiles),
        exclude: calculateDiffForFiles(exclude),
        include: calculateDiffForFiles(include),
      };
      await commitHashDiffsCache.set(cacheKey, result, 2 * HOUR);
      return result;
    },

    getUser: api.getUser,
  };
}

// Types

export type RecalculateOptions =
  | RecalculatePrOptions
  | RecalculateCommitOptions
  | RecalculateCompareOptions;

export interface RecalculatePrOptions {
  type: "pr";
  owner: string;
  repo: string;
  pr: number;
}

export interface RecalculateCommitOptions {
  type: "commit";
  owner: string;
  repo: string;
  ref: string;
}

export interface RecalculateCompareOptions {
  type: "compare";
  owner: string;
  repo: string;
  commitRefs: [string, string];
}

export interface RecalculateResult {
  all: DiffSummary;
  include: DiffSummary;
  exclude: DiffSummary;
}

export interface DiffSummary {
  additions: number;
  deletions: number;
  changes: number;
}
