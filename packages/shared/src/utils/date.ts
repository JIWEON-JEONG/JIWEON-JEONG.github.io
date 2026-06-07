import { format, parseISO, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'PPP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatRelativeDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatISODate = (date: Date = new Date()): string => {
  return date.toISOString();
};

export const isValidDate = (date: string): boolean => {
  try {
    const parsed = parseISO(date);
    return !isNaN(parsed.getTime());
  } catch {
    return false;
  }
};