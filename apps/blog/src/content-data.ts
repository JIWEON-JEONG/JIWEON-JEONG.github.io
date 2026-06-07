/// <reference types="vite/client" />
import { registerLocalPosts } from '@q00-blog/shared';

// Markdown posts from the Hashnode GitHub backup repo (Q00/blog-backup),
// checked out into apps/blog/content at build time. Bundled eagerly so the
// SPA needs zero network access at runtime.
const modules = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const files = Object.entries(modules).map(([path, raw]) => ({
  name: path.split('/').pop() as string,
  raw,
}));

registerLocalPosts(files);
