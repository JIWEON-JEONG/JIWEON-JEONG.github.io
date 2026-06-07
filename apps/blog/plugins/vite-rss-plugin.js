import { writeFileSync, mkdirSync, readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

export function rssPlugin() {
  return {
    name: "vite-rss-plugin",
    apply: "build",
    async closeBundle() {
      try {
        console.log("🔄 Generating RSS and Atom feeds from local Markdown...");

        const { parseMarkdownPosts, generateRSSFeed, generateAtomFeed } =
          await import("@q00-blog/shared");

        const contentDir = join(process.cwd(), "content");
        let files = [];

        if (existsSync(contentDir)) {
          files = readdirSync(contentDir)
            .filter((name) => name.endsWith(".md"))
            .map((name) => ({
              name,
              raw: readFileSync(join(contentDir, name), "utf8"),
            }));
        } else {
          console.warn(`No content directory at ${contentDir}`);
        }

        const posts = parseMarkdownPosts(files);

        if (posts.length === 0) {
          console.warn("No posts found, generating empty feeds");
        } else {
          console.log(`Found ${posts.length} posts for feeds`);
        }

        const rssXml = generateRSSFeed(posts);
        const atomXml = generateAtomFeed(posts);

        const distPath = "dist";
        mkdirSync(distPath, { recursive: true });
        writeFileSync(join(distPath, "rss.xml"), rssXml, "utf8");
        writeFileSync(join(distPath, "feed.xml"), rssXml, "utf8");
        writeFileSync(join(distPath, "atom.xml"), atomXml, "utf8");

        console.log("RSS and Atom feeds generated successfully");
        console.log("   - /rss.xml");
        console.log("   - /feed.xml");
        console.log("   - /atom.xml");
      } catch (error) {
        console.error("❌ Failed to generate feeds:", error);
        console.warn("📝 Using fallback RSS generation...");

        const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[WPTI]]></title>
    <link>https://wpti.dev</link>
    <description><![CDATA[When Pressure Turns into Inspiration]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://wpti.dev/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>WPTI RSS Generator</generator>
    <webMaster>jqyu.lee@gmail.com (JQ)</webMaster>
    <managingEditor>jqyu.lee@gmail.com (JQ)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} JQ</copyright>
    <ttl>60</ttl>
  </channel>
</rss>`;

        const distPath = "dist";
        mkdirSync(distPath, { recursive: true });
        writeFileSync(join(distPath, "rss.xml"), fallbackRss, "utf8");
        writeFileSync(join(distPath, "feed.xml"), fallbackRss, "utf8");

        console.log("Fallback RSS feeds generated");
      }
    },
  };
}
