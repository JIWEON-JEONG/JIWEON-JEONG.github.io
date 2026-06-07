import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { generatePostSEO, createContentProvider } from '@q00-blog/shared'
import { PostDetail } from '@/components/blog/PostDetail'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const contentProvider = createContentProvider({
      publicationId: ENV.HASHNODE_PUBLICATION_ID,
      apiToken: ENV.HASHNODE_API_TOKEN
    })
    const post = await contentProvider.getPostBySlug(params.slug)
    if (!post) {
      throw new Error('Post not found')
    }

    // Also get all posts for navigation
    const allPosts = await contentProvider.getPosts(20)
    const currentIndex = allPosts.findIndex(p => p.slug === params.slug)
    const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

    return {
      post,
      previousPost: previousPost ? { slug: previousPost.slug, title: previousPost.title } : null,
      nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null
    }
  },
  component: PostPage,
  errorComponent: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The post you're looking for doesn't exist or has been moved.
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

function PostPage() {
  const { post, previousPost, nextPost } = Route.useLoaderData()

  // Update page title and meta tags
  React.useEffect(() => {
    const seoData = generatePostSEO(post)
    document.title = seoData.title

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', seoData.description)

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    if (seoData.ogTitle) updateMetaTag('og:title', seoData.ogTitle)
    if (seoData.ogDescription) updateMetaTag('og:description', seoData.ogDescription)
    if (seoData.ogUrl) updateMetaTag('og:url', seoData.ogUrl)
    if (seoData.ogImage) updateMetaTag('og:image', seoData.ogImage)

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    if (seoData.twitterCard) updateTwitterTag('twitter:card', seoData.twitterCard)
    if (seoData.ogTitle) updateTwitterTag('twitter:title', seoData.ogTitle)
    if (seoData.ogDescription) updateTwitterTag('twitter:description', seoData.ogDescription)
    if (seoData.ogImage) updateTwitterTag('twitter:image', seoData.ogImage)
  }, [post])

  return (
    <div className="container mx-auto px-4 py-8">
      <PostDetail
        post={post}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </div>
  )
}