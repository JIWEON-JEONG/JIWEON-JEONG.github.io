export const ROUTES = {
  HOME: '/',
  POSTS: '/posts',
  POST_DETAIL: '/posts/$slug',
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: '/categories/$category',
  TAGS: '/tags',
  TAG_DETAIL: '/tags/$tag',
  ABOUT: '/about',
} as const;

export const API_ROUTES = {
  POSTS: '/data/posts.json',
  POST_DETAIL: '/data/posts/$slug.json',
  CATEGORIES: '/data/categories.json',
  TAGS: '/data/tags.json',
  METADATA: '/data/metadata.json',
} as const;