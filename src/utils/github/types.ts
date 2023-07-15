export interface DiffEntry {
  filename: string;
  sha: string;
  additions: number;
  deletions: number;
  changes: number;
  status: "modified" | "added" | unknown | undefined;
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
  files: DiffEntry[];
}

export interface Comparison {
  files: DiffEntry[];
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
