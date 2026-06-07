export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  author: string;
  featured: boolean;
  draft: boolean;
  readingTimeMinutes: number;
  wordCount: number;
  views?: number;
  series?: {
    id: string;
    name: string;
    slug: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  coverImage?: string;
}

export interface BlogMetadata {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  authorName: string;
  authorEmail: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  navigation: NavigationItem[];
  featuredPostsCount: number;
  postsPerPage: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  external: boolean;
  order: number;
  children?: NavigationItem[];
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  readingMode: boolean;
  lastVisited: Date;
  bookmarkedPosts: string[]; // slugs
}


export interface TableOfContents {
  items: TOCItem[];
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}