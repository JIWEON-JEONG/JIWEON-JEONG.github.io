import { Link } from '@tanstack/react-router';
import { BlogPost, formatDate, formatRelativeDate } from '@q00-blog/shared';

interface BookshelfListProps {
  posts: BlogPost[];
  className?: string;
}

export const BookshelfList = ({ posts, className = '' }: BookshelfListProps) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {posts.map((post, index) => (
        <article key={post.slug} className="group">
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className="block py-4 px-6 border-l-4 border-stone-200 dark:border-stone-700
                       bg-stone-50/30 dark:bg-stone-900/30
                       transition-all duration-200
                       hover:border-stone-400 dark:hover:border-stone-500
                       hover:bg-stone-100/50 dark:hover:bg-stone-800/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold
                                   text-stone-600 dark:text-stone-400
                                   bg-stone-200/60 dark:bg-stone-700/60
                                   rounded-full shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-stone-900 dark:text-white
                                 text-lg leading-tight truncate">
                    {post.title}
                  </h3>
                </div>

                {post.excerpt && (
                  <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed
                               line-clamp-2 ml-11">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-1 text-xs text-stone-500 dark:text-stone-400 shrink-0">
                <time
                  dateTime={post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt}
                  title={formatDate(post.publishedAt)}
                >
                  {formatRelativeDate(post.publishedAt)}
                </time>
                <span>{post.readingTimeMinutes} min</span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};