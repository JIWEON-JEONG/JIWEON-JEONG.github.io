import type { BlogPost } from '../types/blog';

export type PostLanguage = 'ko' | 'en';

const LANGUAGE_TAGS: PostLanguage[] = ['ko', 'en'];

const LANGUAGE_LABELS: Record<PostLanguage, string> = {
  ko: '한국어',
  en: 'English',
};

export function getPostLanguage(post: BlogPost): PostLanguage | null {
  const hit = post.tags
    .map((t) => t.toLowerCase())
    .find((t): t is PostLanguage => (LANGUAGE_TAGS as string[]).includes(t));
  return hit ?? null;
}

export function getLanguageLabel(lang: PostLanguage): string {
  return LANGUAGE_LABELS[lang];
}

// Topical tags only — the language axis (ko/en) is presented separately, not
// as a content tag.
export function getTopicTags(post: BlogPost): string[] {
  return post.tags.filter(
    (t) => !(LANGUAGE_TAGS as string[]).includes(t.toLowerCase())
  );
}
