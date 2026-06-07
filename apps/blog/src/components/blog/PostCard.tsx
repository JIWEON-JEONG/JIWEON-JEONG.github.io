import { Link } from '@tanstack/react-router';
import {
  BlogPost,
  formatDate,
  formatRelativeDate,
  getPostLanguage,
  getTopicTags,
} from '@q00-blog/shared';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export const PostCard = ({
  post,
  featured = false,
  showExcerpt = true,
  className = '',
}: PostCardProps) => {
  const language = getPostLanguage(post);
  const topicTags = getTopicTags(post).slice(0, featured ? 5 : 3);

  const cardClasses = `
    group relative flex flex-col h-full border border-stone-200 dark:border-stone-800
    bg-stone-50/40 dark:bg-stone-900/40 p-7 transition-colors duration-200
    hover:border-stone-400 dark:hover:border-stone-600
    ${featured ? 'md:col-span-2 lg:col-span-2' : ''}
    ${className}
  `.trim();

  return (
    <article className={cardClasses}>
      {/* Meta row */}
      <div className="flex items-center justify-between gap-3 mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
        <div className="flex items-center gap-2">
          {post.series && (
            <>
              <Link
                to="/series/$slug"
                params={{ slug: post.series.slug }}
                className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                {post.series.name}
              </Link>
              <span aria-hidden className="text-stone-300 dark:text-stone-700">
                /
              </span>
            </>
          )}
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
        </div>
        {language && (
          <span className="border border-stone-300 dark:border-stone-700 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-[0.2em] text-stone-500 dark:text-stone-400">
            {language}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mb-3">
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className={`font-display font-medium leading-[1.2] text-stone-900 dark:text-stone-50
                      decoration-stone-300 dark:decoration-stone-600 underline-offset-[6px] group-hover:underline
                      ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      {showExcerpt && post.excerpt && (
        <p className="mb-6 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t border-stone-200/70 dark:border-stone-800">
        {topicTags.length > 0 ? (
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
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
        ) : (
          <span />
        )}
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 shrink-0">
          {post.readingTimeMinutes} min
        </span>
      </div>
    </article>
  );
};
