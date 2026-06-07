import { Link } from '@tanstack/react-router';
import { BlogPost, formatDate } from '@q00-blog/shared';

interface SeriesCardProps {
  series: {
    id: string;
    name: string;
    slug: string;
    posts: BlogPost[];
  };
  className?: string;
}

export const SeriesCard = ({ series, className = '' }: SeriesCardProps) => {
  const latestPost = series.posts[0]; // Assuming posts are sorted by date

  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-stone-200/60 dark:border-stone-700/60
      bg-stone-50/80 dark:bg-stone-900/80 p-8 transition-all duration-200 ease-out ${className}`}>

      <div className="flex flex-col h-full">
        {/* Series Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300
                         bg-stone-100 dark:bg-stone-800
                         rounded-full border border-stone-200/50 dark:border-stone-700/50">
            📚 Series
          </span>
        </div>

        {/* Series Title */}
        <h2 className="mb-4 transition-colors duration-300">
          <span className="block font-bold leading-snug text-stone-900 dark:text-white text-xl tracking-tight">
            {series.name}
          </span>
        </h2>

        {/* Posts Count and Latest Post */}
        <div className="mb-4 flex-grow">
          <p className="text-sm text-stone-600 dark:text-stone-300 mb-2">
            {series.posts.length} {series.posts.length === 1 ? 'post' : 'posts'} in this series
          </p>

          {latestPost && (
            <div className="space-y-2">
              <p className="text-sm text-stone-500 dark:text-stone-400">Latest post:</p>
              <Link
                to="/posts/$slug"
                params={{ slug: latestPost.slug }}
                className="block text-sm font-medium text-stone-900 dark:text-white
                           transition-colors line-clamp-2"
              >
                {latestPost.title}
              </Link>
            </div>
          )}
        </div>

        {/* Series Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-stone-500 dark:text-stone-400 mt-auto gap-2">
          <div className="flex items-center space-x-2">
            {latestPost && (
              <time
                dateTime={latestPost.publishedAt instanceof Date ? latestPost.publishedAt.toISOString() : latestPost.publishedAt}
                className="shrink-0"
              >
                Updated {formatDate(latestPost.publishedAt)}
              </time>
            )}
          </div>

          <Link
            to="/tags/$tag"
            params={{ tag: series.slug }}
            className="text-stone-700 dark:text-stone-300 font-medium transition-colors shrink-0 sm:text-right"
          >
            View Series →
          </Link>
        </div>
      </div>
    </article>
  );
};