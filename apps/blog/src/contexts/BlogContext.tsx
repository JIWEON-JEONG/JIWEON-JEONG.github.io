import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { BlogPost, createContentProvider } from "@q00-blog/shared";

interface BlogContextValue {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: string[];
  tags: string[];
  series: Array<{
    id: string;
    name: string;
    slug: string;
    posts: BlogPost[];
  }>;
  isLoading: boolean;
  error: string | null;
  getPostBySlug: (slug: string) => Promise<BlogPost | null>;
  searchPosts: (query: string) => Promise<BlogPost[]>;
  getPostsByCategory: (category: string) => Promise<BlogPost[]>;
  getPostsByTag: (tag: string) => Promise<BlogPost[]>;
  getDraft: (draftId: string) => Promise<{
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    content: {
      markdown: string;
    };
  } | null>;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextValue | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [series, setSeries] = useState<
    Array<{
      id: string;
      name: string;
      slug: string;
      posts: BlogPost[];
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Content is sourced from the local Markdown backup bundled at build time.
  const contentProvider = createContentProvider();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch data using the content provider
      const [postsData, featuredData, categoriesData, tagsData, seriesData] =
        await Promise.all([
          contentProvider.getPosts(),
          contentProvider.getFeaturedPosts(),
          contentProvider.getCategories(),
          contentProvider.getTags(),
          contentProvider.getSeries(),
        ]);

      setPosts(postsData);
      setFeaturedPosts(featuredData);
      setCategories(categoriesData);
      setTags(tagsData);
      setSeries(seriesData);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
      // Set empty defaults on error
      setPosts([]);
      setFeaturedPosts([]);
      setCategories([]);
      setTags([]);
      setSeries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      return await contentProvider.getPostBySlug(slug);
    } catch (err) {
      console.error(`Error fetching post ${slug}:`, err);
      return null;
    }
  };

  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    try {
      return await contentProvider.searchPosts(query);
    } catch (err) {
      console.error("Error searching posts:", err);
      return [];
    }
  };

  const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
    try {
      return await contentProvider.getPostsByCategory(category);
    } catch (err) {
      console.error("Error fetching posts by category:", err);
      return [];
    }
  };

  const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    try {
      return await contentProvider.getPostsByTag(tag);
    } catch (err) {
      console.error("Error fetching posts by tag:", err);
      return [];
    }
  };

  const getDraft = async (draftId: string): Promise<{
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    content: {
      markdown: string;
    };
  } | null> => {
    try {
      return await contentProvider.getDraft(draftId);
    } catch (err) {
      console.error(`Error fetching draft ${draftId}:`, err);
      return null;
    }
  };

  const refreshPosts = async () => {
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value: BlogContextValue = {
    posts,
    featuredPosts,
    categories,
    tags,
    series,
    isLoading,
    error,
    getPostBySlug,
    searchPosts,
    getPostsByCategory,
    getPostsByTag,
    getDraft,
    refreshPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
