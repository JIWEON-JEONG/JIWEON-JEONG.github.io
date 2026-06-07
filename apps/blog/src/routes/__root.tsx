/// <reference types="vite/client" />
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ErrorBoundary } from '@q00-blog/ui'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { BlogProvider } from '@/contexts/BlogContext'
import { LangProvider } from '@/contexts/LangContext'
import { Layout } from '@/components/layout/Layout'

export const Route = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <ThemeProvider>
        <BlogProvider>
          <LangProvider>
            <Layout>
              <Outlet />
            </Layout>
            {!import.meta.env.PROD && <TanStackRouterDevtools />}
          </LangProvider>
        </BlogProvider>
      </ThemeProvider>
    </ErrorBoundary>
  ),
  notFoundComponent: () => {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Page not found</p>
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900
                         rounded-md transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </Layout>
    )
  },
})