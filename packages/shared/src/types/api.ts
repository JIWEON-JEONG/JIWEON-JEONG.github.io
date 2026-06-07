export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}

export enum ErrorCodes {
  GITHUB_API_RATE_LIMIT = 'GITHUB_API_RATE_LIMIT',
  GITHUB_AUTH_EXPIRED = 'GITHUB_AUTH_EXPIRED',
  GITHUB_PERMISSION_DENIED = 'GITHUB_PERMISSION_DENIED',
  CONTENT_VALIDATION_FAILED = 'CONTENT_VALIDATION_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  INVALID_CONTENT_FORMAT = 'INVALID_CONTENT_FORMAT'
}

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
}

export interface GitHubCreateFileRequest {
  message: string;
  content: string;
  branch?: string;
  committer?: {
    name: string;
    email: string;
  };
}

export interface GitHubUpdateFileRequest extends GitHubCreateFileRequest {
  sha: string;
}

export interface GitHubAuthUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string;
  permissions?: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
}