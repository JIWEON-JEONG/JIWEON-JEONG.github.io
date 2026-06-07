import { Link } from '@tanstack/react-router';
import {
  BlogPost,
  formatDate,
  generateStructuredData,
  getPostLanguage,
  getTopicTags,
} from '@q00-blog/shared';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useEffect } from 'react';

interface PostDetailProps {
  post: BlogPost;
  previousPost?: { slug: string; title: string } | null;
  nextPost?: { slug: string; title: string } | null;
  className?: string;
}

export const PostDetail = ({ 
  post, 
  previousPost, 
  nextPost, 
  className = '' 
}: PostDetailProps) => {

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = generateStructuredData(post);
    
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const toRemove = document.querySelector('script[type="application/ld+json"]');
      if (toRemove) {
        toRemove.remove();
      }
    };
  }, [post]);

  const sharePost = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Share failed, silently continue
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Post Header */}
      <header className="mb-8">
        {/* Eyebrow: series / primary topic + language */}
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">
          <span className="text-stone-600 dark:text-stone-300">
            {post.series?.name || getTopicTags(post)[0] || 'Essay'}
          </span>
          {getPostLanguage(post) && (
            <>
              <span aria-hidden className="text-stone-300 dark:text-stone-700">/</span>
              <span>{getPostLanguage(post)}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-medium text-stone-900 dark:text-white mb-4 leading-[1.15] tracking-tight">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {post.author}
            </span>
          </div>
          
          <span>•</span>
          
          <time dateTime={typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString()}>
            {formatDate(typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt.toISOString())}
          </time>
          
          <span>•</span>

          <span>{post.readingTimeMinutes} min read</span>

          {post.wordCount && (
            <>
              <span>•</span>
              <span>{post.wordCount.toLocaleString()} words</span>
            </>
          )}
        </div>

        {/* Tags */}
        {getTopicTags(post).length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 font-mono text-[11px] uppercase tracking-[0.16em]">
            {getTopicTags(post).map((tag) => (
              <Link
                key={tag}
                to="/tags/$tag"
                params={{ tag }}
                className="text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Share Button */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
          <button
            onClick={sharePost}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 
                       transition-colors"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" 
              />
            </svg>
            Share
          </button>
        </div>
      </header>

      {/* Post Content */}
      <div className="mb-12">
        <MarkdownRenderer
          content={post.content}
          className="prose-lg"
        />
      </div>

      {/* Post Navigation */}
      {(previousPost || nextPost) && (
        <nav className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Post */}
            <div className={`${!previousPost ? 'md:col-start-2' : ''}`}>
              {previousPost && (
                <Link
                  to="/posts/$slug"
                  params={{ slug: previousPost.slug }}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                             hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    ← Previous
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {previousPost.title}
                  </div>
                </Link>
              )}
            </div>

            {/* Next Post */}
            <div>
              {nextPost && (
                <Link
                  to="/posts/$slug"
                  params={{ slug: nextPost.slug }}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                             hover:border-gray-300 dark:hover:border-gray-600 transition-colors group text-right"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Next →
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {nextPost.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

    </article>
  );
};