import type { BlogPost } from '../types/blog';
import { CONFIG } from '../constants/config';

export interface RawMarkdownFile {
  name: string;
  raw: string;
}

type Frontmatter = Record<string, string>;

const KEY_RE = /^([A-Za-z][A-Za-z0-9_]*):[ \t]?(.*)$/;

function isOpenQuote(value: string | undefined): boolean {
  if (!value) return false;
  if (!value.trimStart().startsWith('"')) return false;
  const count = (value.match(/"/g) || []).length;
  return count % 2 === 1;
}

function stripQuotes(value: string): string {
  const v = value.trim();
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
    return v.slice(1, -1);
  }
  return v;
}

// Hashnode GitHub backup frontmatter: a quoted value (e.g. seoDescription)
// may span multiple lines, including blank lines, until its closing quote.
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const m = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };

  const data: Frontmatter = {};
  let currentKey: string | null = null;

  for (const line of m[1].split(/\r?\n/)) {
    const km = line.match(KEY_RE);
    const insideOpenQuote = currentKey ? isOpenQuote(data[currentKey]) : false;
    if (km && !insideOpenQuote) {
      currentKey = km[1];
      data[currentKey] = km[2];
    } else if (currentKey) {
      data[currentKey] += '\n' + line;
    }
  }

  for (const k of Object.keys(data)) data[k] = stripQuotes(data[k]);
  return { data, body: m[2].replace(/^\s+/, '') };
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveExcerpt(body: string): string {
  const text = stripMarkdown(body);
  return text.length > 200 ? text.slice(0, 200).trimEnd() + '…' : text;
}

function countWords(plain: string): number {
  const latin = plain.split(/\s+/).filter(Boolean).length;
  const cjk = (plain.match(/[　-鿿가-힯]/g) || []).length;
  return latin + cjk;
}

export function isDraftFile(name: string): boolean {
  return name.startsWith('draft-');
}

// Short "scrap" notes (collected from LinkedIn etc.) live in the same backup
// repo, prefixed note_ so they form a separate lane from canonical essays.
export function isNoteFile(name: string): boolean {
  return name.startsWith('note_') || name.startsWith('note-');
}

export interface Note {
  id: string;
  title?: string;
  body: string;
  date: Date;
  source?: string;
  tags: string[];
}

function toNote(file: RawMarkdownFile): Note | null {
  const { data, body } = parseFrontmatter(file.raw);
  const text = body.trim();
  if (!text) return null;

  const rawDate = data.datePublished || data.date || '';
  const parsed = new Date(rawDate);
  const date = isNaN(parsed.getTime()) ? new Date() : parsed;

  const id = (
    data.slug ||
    data.cuid ||
    file.name.replace(/^note[_-]/, '').replace(/\.md$/, '')
  ).trim();

  const tags = (data.tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    id,
    title: data.title?.trim() || undefined,
    body: text,
    date,
    source: data.source?.trim() || data.url?.trim() || undefined,
    tags,
  };
}

export function parseNotes(files: RawMarkdownFile[]): Note[] {
  return files
    .filter((f) => isNoteFile(f.name) && !isDraftFile(f.name))
    .map(toNote)
    .filter((n): n is Note => n !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function toBlogPost(file: RawMarkdownFile): BlogPost | null {
  const { data, body } = parseFrontmatter(file.raw);
  const slug = (data.slug || file.name.replace(/\.md$/, '')).trim();
  const title = (data.title || '').trim();
  if (!slug || !title) return null;

  const published = new Date(data.datePublished || '');
  const publishedAt = isNaN(published.getTime()) ? new Date() : published;

  const tags = (data.tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const seoDescription = data.seoDescription
    ? data.seoDescription.replace(/\s+/g, ' ').trim()
    : '';
  const excerpt = seoDescription || deriveExcerpt(body);
  const wordCount = countWords(stripMarkdown(body));

  return {
    slug,
    title,
    subtitle: data.subtitle || undefined,
    content: body,
    excerpt,
    publishedAt,
    updatedAt: publishedAt,
    tags,
    category: tags[0] || 'general',
    author: CONFIG.AUTHOR_NAME,
    featured: false,
    draft: false,
    readingTimeMinutes: Math.max(1, Math.round(wordCount / 200)),
    wordCount,
    coverImage: data.cover || data.ogImage || undefined,
    seo: {
      metaTitle: data.seoTitle || title,
      metaDescription: excerpt,
      keywords: tags,
    },
  };
}

export function parseMarkdownPosts(files: RawMarkdownFile[]): BlogPost[] {
  return files
    .filter((f) => !isDraftFile(f.name) && !isNoteFile(f.name))
    .map(toBlogPost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
