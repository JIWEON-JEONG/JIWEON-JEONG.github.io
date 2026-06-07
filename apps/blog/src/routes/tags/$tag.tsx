import { createFileRoute } from '@tanstack/react-router'
import { createContentProvider } from '@q00-blog/shared'
import { PostList } from '@/components/blog/PostList'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/tags/$tag')({
  loader: async ({ params }) => {
    const contentProvider = createContentProvider({
      publicationId: ENV.HASHNODE_PUBLICATION_ID,
      apiToken: ENV.HASHNODE_API_TOKEN
    })
    const posts = await contentProvider.getPostsByTag(params.tag)
    return {
      posts,
      tag: params.tag
    }
  },
  component: TagPage,
  errorComponent: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Tag Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          No posts found for this tag.
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

function TagPage() {
  const { posts, tag } = Route.useLoaderData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
          Posts tagged with "{tag}"
        </h1>
        <p className="text-stone-600 dark:text-stone-300">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      <PostList
        posts={posts}
        showFeatured={false}
        title=""
      />
    </div>
  )
}