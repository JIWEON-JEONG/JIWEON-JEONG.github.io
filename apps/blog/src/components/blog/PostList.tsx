import { useState, useMemo } from 'react';
import { BlogPost } from '@q00-blog/shared';
import { PostCard } from './PostCard';
import { LoadingSpinner } from '@q00-blog/ui';

interface PostListProps {
  posts: BlogPost[];
  isLoading?: boolean;
  showFeatured?: boolean;
  postsPerPage?: number;
  title?: string;
  className?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;
  
  let visiblePages: (number | string)[] = pages;
  
  if (showEllipsis) {
    if (currentPage <= 4) {
      visiblePages = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      visiblePages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      visiblePages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-stone-500 bg-stone-50 border border-stone-300
                   rounded-md disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400"
      >
        Previous
      </button>
      
      {visiblePages.map((page, index) => (
        <span key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-sm text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${currentPage === page
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-500 bg-stone-50 border border-stone-300 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400'
                }`}
            >
              {page}
            </button>
          )}
        </span>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-stone-500 bg-stone-50 border border-stone-300
                   rounded-md disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400"
      >
        Next
      </button>
    </nav>
  );
};

export const PostList = ({ 
  posts, 
  isLoading = false, 
  showFeatured = false,
  postsPerPage = 10,
  title,
  className = ''
}: PostListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { featuredPosts, paginatedPosts, totalPages } = useMemo(() => {
    const featured = showFeatured ? posts.filter(post => post.featured) : [];
    const regular = showFeatured ? posts.filter(post => !post.featured) : posts;
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginated = regular.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(regular.length / postsPerPage);
    
    return {
      featuredPosts: featured,
      paginatedPosts: paginated,
      totalPages,
    };
  }, [posts, showFeatured, currentPage, postsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of posts list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">No posts found</p>
          <p className="text-sm">Check back later for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h2>
      )}

      {/* Featured Posts Section */}
      {showFeatured && featuredPosts.length > 0 && (
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Featured Posts
          </h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                featured={true}
                showExcerpt={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts Section */}
      {(paginatedPosts.length > 0 || (!showFeatured && posts.length > 0)) && (
        <section>
          {showFeatured && featuredPosts.length > 0 && (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Latest Posts
            </h3>
          )}

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {(showFeatured ? paginatedPosts : posts).map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                featured={false}
                showExcerpt={true}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      )}
    </div>
  );
};