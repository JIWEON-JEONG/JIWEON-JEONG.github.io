// Environment variable helper that works in both browser and Node.js
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Node.js environment (including RSS generation scripts)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }

  // Browser environment - try to access via globalThis (Vite defines these)
  if (typeof globalThis !== 'undefined' && (globalThis as any).process?.env) {
    return (globalThis as any).process.env[key] || defaultValue;
  }

  return defaultValue;
};

export const CONFIG = {
  SITE_URL: getEnvVar('VITE_SITE_URL', 'http://localhost:5173'),
  SITE_TITLE: getEnvVar('VITE_SITE_TITLE', '정지원의 기록'),
  SITE_DESCRIPTION: getEnvVar('VITE_SITE_DESCRIPTION', 'Software Engineer. Spring, AWS, 인프라를 공부하며 성장을 기록하는 공간입니다.'),
  AUTHOR_NAME: getEnvVar('VITE_AUTHOR_NAME', 'Jiweon Jeong'),
  AUTHOR_EMAIL: getEnvVar('VITE_AUTHOR_EMAIL', 'dlektl6@naver.com'),
  GITHUB_REPO: getEnvVar('VITE_GITHUB_REPO', 'JIWEON-JEONG/JIWEON-JEONG.github.io'),
  POSTS_PER_PAGE: parseInt(getEnvVar('VITE_POSTS_PER_PAGE', '10')),
  FEATURED_POSTS_COUNT: parseInt(getEnvVar('VITE_FEATURED_POSTS_COUNT', '3')),
  GITHUB_CLIENT_ID: getEnvVar('VITE_GITHUB_CLIENT_ID', ''),

  // Hashnode Integration
  HASHNODE_ENABLED: getEnvVar('VITE_HASHNODE_ENABLED', 'false') === 'true',
  HASHNODE_PUBLICATION_ID: getEnvVar('VITE_HASHNODE_PUBLICATION_ID', ''),
  HASHNODE_API_TOKEN: getEnvVar('VITE_HASHNODE_API_TOKEN', ''),
  HASHNODE_PUBLICATION_HOST: getEnvVar('VITE_HASHNODE_PUBLICATION_HOST', ''),
} as const;

export const STORAGE_KEYS = {
  THEME: 'q00-blog-theme',
  USER_PREFERENCES: 'q00-blog-preferences',
  POSTS_CACHE: 'q00-blog-posts-cache',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const;
export const DEFAULT_READING_SPEED = 200;