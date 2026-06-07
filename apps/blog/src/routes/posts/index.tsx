import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { getPostLanguage, getTopicTags, type PostLanguage } from '@q00-blog/shared'
import { useBlog } from '@/contexts/BlogContext'
import { useLang } from '@/contexts/LangContext'
import { PostListItem } from '@/components/blog/PostListItem'
import { LoadingSpinner } from '@q00-blog/ui'

export const Route = createFileRoute('/posts/')({
  component: PostsPage,
})

type LangFilter = 'all' | PostLanguage

const LANGS: Array<{ key: LangFilter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
]

function PostsPage() {
  const { posts, isLoading, error } = useBlog()
  const { lang: prefLang } = useLang()
  const [lang, setLang] = useState<LangFilter>(prefLang)
  const [topic, setTopic] = useState<string | null>(null)

  // Follow the site-wide language preference (header toggle / auto-detect).
  useEffect(() => {
    setLang(prefLang)
  }, [prefLang])

  // Topic facets that actually help navigate the archive: real tags shared by
  // more than one post, busiest first.
  const topics = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((p) =>
      getTopicTags(p).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    )
    return [...counts.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => ({ tag, n }))
  }, [posts])

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (lang !== 'all' && getPostLanguage(p) !== lang) return false
        if (topic && !getTopicTags(p).includes(topic)) return false
        return true
      }),
    [posts, lang, topic]
  )

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-stone-400">
          Error
        </p>
        <h1 className="font-display text-3xl text-stone-900 dark:text-white mt-2">
          Could not load posts
        </h1>
        <p className="text-stone-600 dark:text-stone-300 mt-3">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
      {/* Toolbar */}
      <div className="flex flex-col gap-5 border-b border-stone-200 dark:border-stone-800 pb-5 mb-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
            Language
          </span>
          <div className="inline-flex font-mono text-xs">
            {LANGS.map((l, i) => {
              const active = lang === l.key
              return (
                <button
                  key={l.key}
                  onClick={() => setLang(l.key)}
                  aria-pressed={active}
                  className={`px-3.5 py-1.5 border border-stone-300 dark:border-stone-700 transition-colors
                    ${i === 0 ? 'rounded-l-full' : ''} ${i === LANGS.length - 1 ? 'rounded-r-full' : ''}
                    ${i !== 0 ? '-ml-px' : ''}
                    ${
                      active
                        ? 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 relative z-10'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
        </div>

        {topics.length > 0 && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
              Topic
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
              <button
                onClick={() => setTopic(null)}
                className={`uppercase tracking-[0.12em] transition-colors ${
                  topic === null
                    ? 'text-stone-900 dark:text-stone-100 underline underline-offset-[6px] decoration-2'
                    : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                All
              </button>
              {topics.map(({ tag, n }) => {
                const active = topic === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setTopic(active ? null : tag)}
                    className={`uppercase tracking-[0.12em] transition-colors ${
                      active
                        ? 'text-stone-900 dark:text-stone-100 underline underline-offset-[6px] decoration-2'
                        : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                  >
                    {tag}
                    <sup className="ml-1 text-[0.65em] text-stone-400 dark:text-stone-600">
                      {n}
                    </sup>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-2xl text-stone-700 dark:text-stone-300">
            Nothing here yet
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 mt-3">
            Try a different filter
          </p>
        </div>
      ) : (
        <div>
          {filtered.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
