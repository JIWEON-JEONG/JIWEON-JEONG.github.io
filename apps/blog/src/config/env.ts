// Vite environment variables - centralized access
export const ENV = {
  SITE_URL: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  SITE_TITLE: import.meta.env.VITE_SITE_TITLE || '정지원의 기록',
  SITE_DESCRIPTION: import.meta.env.VITE_SITE_DESCRIPTION || 'Software Engineer. 생각을 기록하는 공간입니다.',
  AUTHOR_NAME: import.meta.env.VITE_AUTHOR_NAME || 'Jiweon Jeong',
  AUTHOR_EMAIL: import.meta.env.VITE_AUTHOR_EMAIL || 'dlektl6@naver.com',
  GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO || 'JIWEON-JEONG/JIWEON-JEONG.github.io',
  POSTS_PER_PAGE: parseInt(import.meta.env.VITE_POSTS_PER_PAGE || '10'),
  FEATURED_POSTS_COUNT: parseInt(import.meta.env.VITE_FEATURED_POSTS_COUNT || '3'),
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID || '',

  // Hashnode Integration
  HASHNODE_ENABLED: import.meta.env.VITE_HASHNODE_ENABLED === 'true',
  HASHNODE_PUBLICATION_ID: import.meta.env.VITE_HASHNODE_PUBLICATION_ID || '',
  HASHNODE_API_TOKEN: import.meta.env.VITE_HASHNODE_API_TOKEN || '',
  HASHNODE_PUBLICATION_HOST: import.meta.env.VITE_HASHNODE_PUBLICATION_HOST || '',
} as const;