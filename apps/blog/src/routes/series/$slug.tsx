import { createFileRoute } from '@tanstack/react-router'
import { createContentProvider } from '@q00-blog/shared'
import { BookshelfList } from '@/components/blog/BookshelfList'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/series/$slug')({
  loader: async ({ params }) => {
    const contentProvider = createContentProvider({
      publicationId: ENV.HASHNODE_PUBLICATION_ID,
      apiToken: ENV.HASHNODE_API_TOKEN
    })
    const posts = await contentProvider.getSeriesPosts(params.slug)
    const series = await contentProvider.getSeries()
    const currentSeries = series.find(s => s.slug === params.slug)
    return {
      posts,
      slug: params.slug,
      seriesName: currentSeries?.name || params.slug
    }
  },
  component: SeriesPage,
  errorComponent: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Series Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          No posts found for this series.
        </p>
        <a
          href="/posts"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900
                     rounded-md transition-colors"
        >
          View All Posts
        </a>
      </div>
    </div>
  ),
})

function SeriesPage() {
  const { posts, seriesName } = Route.useLoaderData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
          📚 {seriesName}
        </h1>
        <p className="text-stone-600 dark:text-stone-300">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this series
        </p>
      </div>

      <BookshelfList posts={posts} />
    </div>
  )
}