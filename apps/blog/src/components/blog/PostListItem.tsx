import { Link } from '@tanstack/react-router';
import {
  BlogPost,
  formatDate,
  formatRelativeDate,
  getPostLanguage,
  getTopicTags,
} from '@q00-blog/shared';

interface PostListItemProps {
  post: BlogPost;
  className?: string;
}

export const PostListItem = ({ post, className = '' }: PostListItemProps) => {
  const language = getPostLanguage(post);
  const topicTags = getTopicTags(post).slice(0, 3);

  return (
    <article
      className={`group border-b border-stone-200/70 dark:border-stone-800 py-8 first:pt-0 last:border-b-0 ${className}`}
    >
      {/* Meta row */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
          <time
            dateTime={
              post.publishedAt instanceof Date
                ? post.publishedAt.toISOString()
                : post.publishedAt
            }
            title={formatDate(post.publishedAt)}
          >
            {formatRelativeDate(post.publishedAt)}
          </time>
          <span aria-hidden className="text-stone-300 dark:text-stone-700">
            /
          </span>
          <span>{post.readingTimeMinutes} min</span>
        </div>
        {language && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 border border-stone-300 dark:border-stone-700 rounded-full px-2 py-0.5">
            {language}
          </span>
        )}
      </div>

      {/* Title */}
      <h2>
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="font-display text-2xl sm:text-[28px] leading-[1.2] font-medium text-stone-900 dark:text-stone-50
                     decoration-stone-300 dark:decoration-stone-600 underline-offset-[6px]
                     group-hover:underline"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2 max-w-2xl">
          {post.excerpt}
        </p>
      )}

      {/* Topic tags */}
      {topicTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
          {topicTags.map((tag) => (
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
    </article>
  );
};
