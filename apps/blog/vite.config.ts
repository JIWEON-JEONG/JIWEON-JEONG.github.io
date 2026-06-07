import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { rssPlugin } from './plugins/vite-rss-plugin.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../../', 'VITE_')

  return {
    envDir: '../../',
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {} as Record<string, string>)
    },
  plugins: [
    react(),
    TanStackRouterVite(),
    rssPlugin()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/packages/shared/src',
      '@ui': '/packages/ui/src'
    }
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          markdown: ['marked', 'dompurify', 'prismjs']
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/, /packages\/.*\/dist/]
    }
  },
  optimizeDeps: {
    include: ['@q00-blog/shared', '@q00-blog/ui']
  }
}
})