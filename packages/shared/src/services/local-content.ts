import { BlogPost, BlogMetadata } from '../types/blog';
import { CONFIG } from '../constants/config';
import { ContentProvider } from './content';
import { parseMarkdownPosts, parseNotes, Note, RawMarkdownFile } from './markdown';

const SERIES_DEFS: ReadonlyArray<{ tag: string; id: string; name: string; slug: string }> = [];

let registeredPosts: BlogPost[] = [];
let registeredNotes: Note[] = [];

export function registerLocalPosts(files: RawMarkdownFile[]): void {
  registeredPosts = parseMarkdownPosts(files);
  registeredNotes = parseNotes(files);
}

export function getLocalNotes(): Note[] {
  return registeredNotes;
}

function seriesDefForPost(post: BlogPost) {
  const lowered = post.tags.map((t) => t.toLowerCase());
  return SERIES_DEFS.find((s) => lowered.includes(s.tag));
}

export class LocalMarkdownContentProvider implements ContentProvider {
  private all(): BlogPost[] {
    return registeredPosts.map((post) => {
      const def = seriesDefForPost(post);
      return def
        ? { ...post, series: { id: def.id, name: def.name, slug: def.slug } }
        : post;
    });
  }

  async getPosts(limit?: number, offset = 0): Promise<BlogPost[]> {
    const posts = this.all();
    return limit ? posts.slice(offset, offset + limit) : posts.slice(offset);
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.all().find((p) => p.slug === slug) || null;
  }

  async getMetadata(): Promise<BlogMetadata> {
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

  async searchPosts(query: string): Promise<BlogPost[]> {
    const q = query.toLowerCase();
    return this.all().filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const flagged = this.all().filter((p) => p.featured);
    const base = flagged.length > 0 ? flagged : this.all();
    return base.slice(0, CONFIG.FEATURED_POSTS_COUNT);
  }

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    return this.all().filter((p) => p.category === category);
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    return this.all().filter((p) => p.tags.includes(tag));
  }

  async getSeriesPosts(seriesSlug: string): Promise<BlogPost[]> {
    return this.all()
      .filter((p) => p.series?.slug === seriesSlug)
      .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
  }

  async getTags(): Promise<string[]> {
    const set = new Set<string>();
    this.all().forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }

  async getCategories(): Promise<string[]> {
    const set = new Set<string>();
    this.all().forEach((p) => set.add(p.category));
    return Array.from(set).sort();
  }

  async getSeries(): Promise<
    Array<{ id: string; name: string; slug: string; posts: BlogPost[] }>
  > {
    const posts = this.all();
    return SERIES_DEFS.map((def) => ({
      id: def.id,
      name: def.name,
      slug: def.slug,
      posts: posts
        .filter((p) => p.series?.slug === def.slug)
        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime()),
    })).filter((s) => s.posts.length > 0);
  }

  async getDraft(): Promise<{
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    content: { markdown: string };
  } | null> {
    return null;
  }
}

export function createLocalContentProvider(): ContentProvider {
  return new LocalMarkdownContentProvider();
}
