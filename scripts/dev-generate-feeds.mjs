import { createContentProvider, generateRSSFeed, generateAtomFeed } from '@q00-blog/shared';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFeeds() {
  try {
    console.log('🔄 Generating RSS and Atom feeds for development...');

    const contentProvider = createContentProvider();
    const posts = await contentProvider.getPosts(50);

    if (posts.length === 0) {
      console.warn('⚠️  No posts found, generating empty feeds');
    } else {
      console.log(`📄 Found ${posts.length} posts`);
    }

    // Generate RSS feed
    const rssXml = generateRSSFeed(posts);
    const atomXml = generateAtomFeed(posts);

    // Ensure public directory exists
    const publicPath = join(__dirname, '../apps/blog/public');
    mkdirSync(publicPath, { recursive: true });

    // Write RSS feed to public directory (for dev server)
    writeFileSync(join(publicPath, 'rss.xml'), rssXml, 'utf8');
    writeFileSync(join(publicPath, 'feed.xml'), rssXml, 'utf8'); // Alternative path
    writeFileSync(join(publicPath, 'atom.xml'), atomXml, 'utf8');

    console.log('✅ RSS and Atom feeds generated successfully in public/');
    console.log('   - /rss.xml');
    console.log('   - /feed.xml');
    console.log('   - /atom.xml');

  } catch (error) {
    console.error('❌ Failed to generate feeds:', error);
    process.exit(1);
  }
}

generateFeeds();