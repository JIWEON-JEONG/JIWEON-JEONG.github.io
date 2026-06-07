import { BlogPost, BlogMetadata } from '../types/blog';
import { CONFIG, STORAGE_KEYS } from '../constants/config';
import { HashnodeService } from './hashnode';
import { createLocalContentProvider } from './local-content';

export interface ContentProvider {
  getPosts(limit?: number, offset?: number): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getMetadata(): Promise<BlogMetadata>;
  searchPosts(query: string): Promise<BlogPost[]>;
  getFeaturedPosts(): Promise<BlogPost[]>;
  getPostsByCategory(category: string): Promise<BlogPost[]>;
  getPostsByTag(tag: string): Promise<BlogPost[]>;
  getSeriesPosts(seriesSlug: string): Promise<BlogPost[]>;
  getTags(): Promise<string[]>;
  getCategories(): Promise<string[]>;
  getSeries(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    posts: BlogPost[];
  }>>;
  getDraft(draftId: string): Promise<{
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    content: {
      markdown: string;
    };
  } | null>;
}


export class HashnodeContentProvider implements ContentProvider {
  private hashnodeService: HashnodeService;
  private cacheKey = STORAGE_KEYS.POSTS_CACHE;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor(hashnodeService: HashnodeService) {
    this.hashnodeService = hashnodeService;
  }

  private getCachedData<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(`${this.cacheKey}-${key}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > this.cacheTimeout) {
        localStorage.removeItem(`${this.cacheKey}-${key}`);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  private setCachedData<T>(key: string, data: T): void {
    try {
      localStorage.setItem(`${this.cacheKey}-${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch {
      // Ignore cache errors
    }
  }

  async getPosts(limit: number = CONFIG.POSTS_PER_PAGE, offset: number = 0): Promise<BlogPost[]> {
    const cacheKey = `posts-${limit}-${offset}`;
    const cached = this.getCachedData<BlogPost[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const result = await this.hashnodeService.getPosts(limit);
      const transformedPosts = result.posts.map(post => this.hashnodeService.transformToBlogPost(post));

      this.setCachedData(cacheKey, transformedPosts);
      return transformedPosts;
    } catch (error) {
      console.error('Failed to fetch posts from Hashnode:', error);
      return [];
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `post-${slug}`;
    const cached = this.getCachedData<BlogPost>(cacheKey);
    if (cached) return cached;

    try {
      const hashnodePost = await this.hashnodeService.getPostBySlug(slug);
      if (!hashnodePost) return null;

      const transformedPost = this.hashnodeService.transformToBlogPost(hashnodePost);
      this.setCachedData(cacheKey, transformedPost);
      return transformedPost;
    } catch (error) {
      console.error(`Failed to fetch post ${slug} from Hashnode:`, error);
      return null;
    }
  }

  async getMetadata(): Promise<BlogMetadata> {
    const cacheKey = 'metadata';
    const cached = this.getCachedData<BlogMetadata>(cacheKey);
    if (cached) return cached;

    try {
      const publication = await this.hashnodeService.getPublication();
      const metadata = this.hashnodeService.transformToBlogMetadata(publication);

      this.setCachedData(cacheKey, metadata);
      return metadata;
    } catch (error) {
      console.error('Failed to fetch metadata from Hashnode:', error);
      // Return default metadata
      return {
        siteTitle: CONFIG.SITE_TITLE,
        siteDescription: CONFIG.SITE_DESCRIPTION,
        siteUrl: CONFIG.SITE_URL,
        authorName: CONFIG.AUTHOR_NAME,
        authorEmail: CONFIG.AUTHOR_EMAIL,
        socialLinks: {},
        theme: {
          primaryColor: '#2563eb',
          accentColor: '#3b82f6',
          backgroundColor: '#ffffff',
          textColor: '#111827',
        },
        navigation: [
          { label: 'Home', href: '/', external: false, order: 1 },
          { label: 'Posts', href: '/posts', external: false, order: 2 },
          { label: 'About', href: '/about', external: false, order: 3 },
        ],
        featuredPostsCount: CONFIG.FEATURED_POSTS_COUNT,
        postsPerPage: CONFIG.POSTS_PER_PAGE,
      };
    }
  }

  async searchPosts(query: string): Promise<BlogPost[]> {
    // For Hashnode, we'll fetch all posts and search locally
    const posts = await this.getPosts(50); // Hashnode API limit is 50
    const lowercaseQuery = query.toLowerCase();

    return posts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await this.getPosts();
    return posts.filter(post => post.featured).slice(0, CONFIG.FEATURED_POSTS_COUNT);
  }

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getPosts(50); // Hashnode API limit is 50
    return posts.filter(post => post.category === category);
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await this.getPosts(50); // Hashnode API limit is 50
    return posts.filter(post => post.tags.includes(tag));
  }

  async getSeriesPosts(seriesSlug: string): Promise<BlogPost[]> {
    const cacheKey = `series-posts-${seriesSlug}`;
    const cached = this.getCachedData<BlogPost[]>(cacheKey);
    if (cached) return cached;

    try {
      const seriesPosts = await this.hashnodeService.getSeriesPosts(seriesSlug);
      const transformedPosts = seriesPosts.map(post => this.hashnodeService.transformToBlogPost(post));

      this.setCachedData(cacheKey, transformedPosts);
      return transformedPosts;
    } catch (error) {
      console.error('Failed to fetch series posts:', error);
      return [];
    }
  }

  async getTags(): Promise<string[]> {
    const cacheKey = 'tags';
    const cached = this.getCachedData<string[]>(cacheKey);
    if (cached) return cached;

    const posts = await this.getPosts(50); // Hashnode API limit is 50
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    const tags = Array.from(tagSet).sort();

    this.setCachedData(cacheKey, tags);
    return tags;
  }

  async getCategories(): Promise<string[]> {
    const cacheKey = 'categories';
    const cached = this.getCachedData<string[]>(cacheKey);
    if (cached) return cached;

    const posts = await this.getPosts(50); // Hashnode API limit is 50
    const categorySet = new Set<string>();
    posts.forEach(post => categorySet.add(post.category));
    const categories = Array.from(categorySet).sort();

    this.setCachedData(cacheKey, categories);
    return categories;
  }

  async getSeries(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    posts: BlogPost[];
  }>> {
    const cacheKey = 'series';
    const cached = this.getCachedData<Array<{
      id: string;
      name: string;
      slug: string;
      posts: BlogPost[];
    }>>(cacheKey);
    if (cached) return cached;

    try {
      const seriesData = await this.hashnodeService.getSeries();
      const transformedSeries = seriesData.map(series => ({
        id: series.id,
        name: series.name,
        slug: series.slug,
        posts: series.posts.map(post => this.hashnodeService.transformToBlogPost(post))
      }));

      this.setCachedData(cacheKey, transformedSeries);
      return transformedSeries;
    } catch (error) {
      console.error('Failed to fetch series:', error);
      return [];
    }
  }

  async getDraft(draftId: string): Promise<{
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    content: {
      markdown: string;
    };
  } | null> {
    const cacheKey = `draft-${draftId}`;
    const cached = this.getCachedData<{
      id: string;
      slug: string;
      title: string;
      subtitle?: string;
      content: {
        markdown: string;
      };
    }>(cacheKey);
    if (cached) return cached;

    try {
      const draft = await this.hashnodeService.getDraft(draftId);
      if (draft) {
        this.setCachedData(cacheKey, draft);
      }
      return draft;
    } catch (error) {
      console.error(`Failed to fetch draft ${draftId}:`, error);
      return null;
    }
  }

  clearCache(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.cacheKey)) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // Ignore cache errors in localStorage
    }
  }
}

export function createContentProvider(_config?: {
  publicationId?: string;
  apiToken?: string;
}): ContentProvider {
  // Content is sourced from the local Markdown backup (Hashnode GitHub backup),
  // not the deprecated Hashnode GraphQL API. The argument is kept for
  // backward compatibility with existing route loaders.
  return createLocalContentProvider();
}

