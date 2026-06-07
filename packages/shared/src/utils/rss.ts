import type { BlogPost } from '../types/blog';
import { CONFIG } from '../constants/config';

export function generateRSSFeed(posts: BlogPost[]): string {
  const buildDate = new Date().toUTCString();

  const rssItems = posts
    .slice(0, 20) // Limit to 20 most recent posts
    .map(post => {
      const pubDate = post.publishedAt instanceof Date
        ? post.publishedAt.toUTCString()
        : new Date(post.publishedAt).toUTCString();

      const postUrl = `${CONFIG.SITE_URL}/posts/${post.slug}`;

      // Clean description - remove HTML tags and limit length
      const description = post.excerpt
        ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 300) + '...'
        : post.title;

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
      ${post.tags ? post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ') : ''}
    </item>`;
    }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${CONFIG.SITE_TITLE}]]></title>
    <link>${CONFIG.SITE_URL}</link>
    <description><![CDATA[${CONFIG.SITE_DESCRIPTION}]]></description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${CONFIG.SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Q00 Blog RSS Generator</generator>
    <webMaster>${CONFIG.AUTHOR_EMAIL} (${CONFIG.AUTHOR_NAME})</webMaster>
    <managingEditor>${CONFIG.AUTHOR_EMAIL} (${CONFIG.AUTHOR_NAME})</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} ${CONFIG.AUTHOR_NAME}</copyright>
    <ttl>60</ttl>${rssItems}
  </channel>
</rss>`;
}

export function generateAtomFeed(posts: BlogPost[]): string {
  const buildDate = new Date().toISOString();

  const atomEntries = posts
    .slice(0, 20) // Limit to 20 most recent posts
    .map(post => {
      const pubDate = post.publishedAt instanceof Date
        ? post.publishedAt.toISOString()
        : new Date(post.publishedAt).toISOString();

      const postUrl = `${CONFIG.SITE_URL}/posts/${post.slug}`;

      // Clean content - remove HTML tags and limit length
      const content = post.excerpt
        ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 500) + '...'
        : post.title;

      return `
    <entry>
      <title type="html"><![CDATA[${post.title}]]></title>
      <link href="${postUrl}"/>
      <id>${postUrl}</id>
      <published>${pubDate}</published>
      <updated>${pubDate}</updated>
      ${post.author ? `<author><name>${post.author}</name></author>` : ''}
      <content type="html"><![CDATA[${content}]]></content>
      ${post.category ? `<category term="${post.category}"/>` : ''}
      ${post.tags ? post.tags.map(tag => `<category term="${tag}"/>`).join('\n      ') : ''}
    </entry>`;
    }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title><![CDATA[${CONFIG.SITE_TITLE}]]></title>
  <link href="${CONFIG.SITE_URL}"/>
  <link href="${CONFIG.SITE_URL}/atom.xml" rel="self"/>
  <id>${CONFIG.SITE_URL}</id>
  <updated>${buildDate}</updated>
  <subtitle><![CDATA[${CONFIG.SITE_DESCRIPTION}]]></subtitle>
  <generator>Q00 Blog Atom Generator</generator>
  ${CONFIG.AUTHOR_NAME ? `<author><name>${CONFIG.AUTHOR_NAME}</name></author>` : ''}${atomEntries}
</feed>`;
}