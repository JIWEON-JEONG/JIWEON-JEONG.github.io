import { CONFIG } from '../constants/config';
import type { BlogPost } from '../types/blog';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const generatePostSEO = (post: BlogPost): SEOMetadata => {
  const title = post.seo?.metaTitle || post.title;
  const keywords = post.seo?.keywords || post.tags;
  const ogImage = post.coverImage || `${CONFIG.SITE_URL}/images/og-post.png`;

  // Build OG title: include subtitle if available
  const ogTitle = post.subtitle ? `${title} — ${post.subtitle}` : title;

  // Build description: prefer metaDescription, then subtitle + excerpt, then just excerpt
  const description = post.seo?.metaDescription ||
    (post.subtitle ? `${post.subtitle}. ${post.excerpt}` : post.excerpt);

  // OG description: subtitle first, then excerpt as fallback
  const ogDescription = post.seo?.metaDescription || post.subtitle || post.excerpt;

  return {
    title: `${title} | ${CONFIG.SITE_TITLE}`,
    description: truncateDescription(description),
    keywords,
    ogTitle,
    ogDescription: truncateDescription(ogDescription),
    ogUrl: `${CONFIG.SITE_URL}/posts/${post.slug}`,
    ogImage,
    twitterCard: post.coverImage ? 'summary_large_image' : 'summary',
    canonicalUrl: `${CONFIG.SITE_URL}/posts/${post.slug}`,
    publishedTime: typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString(),
    modifiedTime: typeof post.updatedAt === 'string' ? post.updatedAt : post.updatedAt.toISOString(),
    author: post.author,
  };
};

export const generatePageSEO = (
  title: string,
  description?: string,
  path: string = ''
): SEOMetadata => {
  return {
    title: title === CONFIG.SITE_TITLE ? title : `${title} | ${CONFIG.SITE_TITLE}`,
    description: description || CONFIG.SITE_DESCRIPTION,
    ogTitle: title,
    ogDescription: description || CONFIG.SITE_DESCRIPTION,
    ogUrl: `${CONFIG.SITE_URL}${path}`,
    ogImage: `${CONFIG.SITE_URL}/images/og-default.png`,
    twitterCard: 'summary',
    canonicalUrl: `${CONFIG.SITE_URL}${path}`,
  };
};

export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

export const generateStructuredData = (post: BlogPost) => {
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || `${CONFIG.SITE_URL}/images/posts/${post.slug}.jpg`,
    datePublished: typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString(),
    dateModified: typeof post.updatedAt === 'string' ? post.updatedAt : post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
      url: CONFIG.SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: CONFIG.SITE_TITLE,
      url: CONFIG.SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${CONFIG.SITE_URL}/posts/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTimeMinutes}M`,
  };

  // Add subtitle if available
  if (post.subtitle) {
    structuredData.alternativeHeadline = post.subtitle;
  }

  // Add series information if available
  if (post.series) {
    structuredData.isPartOf = {
      '@type': 'BlogPosting',
      name: post.series.name,
      url: `${CONFIG.SITE_URL}/tags/${post.series.slug}`,
    };
  }

  // Add view count if available
  if (post.views) {
    structuredData.interactionStatistic = {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ReadAction',
      userInteractionCount: post.views,
    };
  }

  return structuredData;
};