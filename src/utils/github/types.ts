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
