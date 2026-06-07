import type { ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  formatDate,
  formatRelativeDate,
  getPostLanguage,
} from '@q00-blog/shared'
import { ENV } from '@/config/env'
import { useBlog } from '@/contexts/BlogContext'
import { useLang } from '@/contexts/LangContext'
import { LoadingSpinner } from '@q00-blog/ui'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: `${ENV.SITE_TITLE} - ${ENV.SITE_DESCRIPTION}` },
      { name: 'description', content: ENV.SITE_DESCRIPTION },
    ],
    links: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: `${ENV.SITE_TITLE} RSS Feed`,
        href: '/rss.xml',
      },
    ],
  }),
})

const socials: Array<{ label: string; href: string }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%A7%80%EC%9B%90-%EC%A0%95-4044b2234/' },
  { label: 'GitHub', href: 'https://github.com/JIWEON-JEONG' },
]

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400 dark:text-stone-500 mb-6">
      {children}
    </p>
  )
}

function Home() {
  const { posts, isLoading, error } = useBlog()
  const { lang } = useLang()

  if (error) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-3xl text-stone-900 dark:text-white">
          Could not load
        </h1>
        <p className="text-stone-600 dark:text-stone-300 mt-3">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const inLang = posts.filter((p) => getPostLanguage(p) === lang)
  const latest = inLang[0] || posts[0]
  const recentPosts = (inLang.length > 0 ? inLang : posts).slice(0, 5)

  return (
    <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-20">
      {/* Identity */}
      <section>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-stone-900 dark:text-white tracking-tight">
          정지원 (Jiweon&nbsp;Jeong)
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300 max-w-xl">
          Software Engineer. Spring, AWS, 인프라를 공부하며 성장을 기록하는 공간입니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </section>

      {/* Latest post */}
      {latest && (
        <section className="mt-16 sm:mt-20 border-t border-stone-200 dark:border-stone-800 pt-12">
          <SectionLabel>Latest</SectionLabel>
          <div className="flex items-center gap-3 mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
            <time
              dateTime={
                latest.publishedAt instanceof Date
                  ? latest.publishedAt.toISOString()
                  : latest.publishedAt
              }
              title={formatDate(latest.publishedAt)}
            >
              {formatRelativeDate(latest.publishedAt)}
            </time>
            <span aria-hidden className="text-stone-300 dark:text-stone-700">
              /
            </span>
            <span>{latest.readingTimeMinutes} min</span>
          </div>
          <h2 className="mb-4">
            <Link
              to="/posts/$slug"
              params={{ slug: latest.slug }}
              className="font-display text-3xl sm:text-[40px] leading-[1.15] font-medium text-stone-900 dark:text-stone-50
                         underline-offset-[6px] decoration-stone-300 dark:decoration-stone-600 hover:underline"
            >
              {latest.title}
            </Link>
          </h2>
          {latest.excerpt && (
            <p className="text-[17px] leading-relaxed text-stone-600 dark:text-stone-400 max-w-2xl">
              {latest.excerpt}
            </p>
          )}
          <div className="mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            <Link
              to="/posts/$slug"
              params={{ slug: latest.slug }}
              className="text-stone-900 dark:text-stone-100 hover:opacity-60 transition-opacity"
            >
              Read →
            </Link>
            <Link
              to="/posts"
              className="text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              All posts
            </Link>
          </div>
        </section>
      )}

      {/* Recent posts */}
      {recentPosts.length > 1 && (
        <section className="mt-16 sm:mt-20 border-t border-stone-200 dark:border-stone-800 pt-12">
          <div className="flex items-baseline justify-between gap-4">
            <SectionLabel>Recent</SectionLabel>
            <Link
              to="/posts"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              All posts →
            </Link>
          </div>
          <ol className="space-y-px">
            {recentPosts.slice(1).map((p) => (
              <li key={p.slug}>
                <Link
                  to="/posts/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-baseline gap-4 py-3 border-t border-stone-200/70 dark:border-stone-800"
                >
                  <time className="font-mono text-[11px] text-stone-400 dark:text-stone-600 tabular-nums shrink-0">
                    {formatDate(p.publishedAt)}
                  </time>
                  <span className="font-display text-lg text-stone-800 dark:text-stone-200 group-hover:underline underline-offset-[5px] decoration-stone-300 dark:decoration-stone-600">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}
