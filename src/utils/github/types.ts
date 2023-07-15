export interface DiffEntry {
  filename: string;
  sha: string;
  additions: number;
  deletions: number;
  changes: number;
  status: "modified" | undefined;
}

export interface PullRequest {
  additions: number;
  deletions: number;
  changed_files: number;
  head: {
    sha: string;
  };
}

export interface Commit {
  sha: string;
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
}

export interface DiffSummary {
  additions: number;
  deletions: number;
  changes: number;
}

export interface RecalculateResult {
  all: DiffSummary;
  include: DiffSummary;
  exclude: DiffSummary;
}

export interface User {
  login: string;
}

export interface EncodedFile {
  type: "file";
  encoding: "base64";
  path: string;
  content: string;
}

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
