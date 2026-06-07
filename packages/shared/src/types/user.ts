export interface User {
  id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  isAuthenticated: boolean;
  permissions: UserPermissions;
}

export interface UserPermissions {
  canWrite: boolean;
  canAdmin: boolean;
  canDelete: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  code: string; // OAuth code from GitHub
}