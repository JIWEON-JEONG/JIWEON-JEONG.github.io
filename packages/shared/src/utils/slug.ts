export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const createPostSlug = (title: string, date?: Date): string => {
  const slug = createSlug(title);
  if (date) {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    return `${dateStr}-${slug}`;
  }
  return slug;
};

export const extractDateFromSlug = (slug: string): Date | null => {
  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (dateMatch) {
    return new Date(dateMatch[1]);
  }
  return null;
};

export const extractTitleFromSlug = (slug: string): string => {
  // Remove date prefix if present
  const withoutDate = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  // Convert back to title case
  return withoutDate
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};