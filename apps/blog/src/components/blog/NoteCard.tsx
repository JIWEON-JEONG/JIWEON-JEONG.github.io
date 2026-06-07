import { Note, formatDate } from '@q00-blog/shared';
import { MarkdownRenderer } from './MarkdownRenderer';

interface NoteCardProps {
  note: Note;
  /** Index used to vary the resting tilt so a wall of notes feels hand-pinned. */
  index?: number;
  className?: string;
}

const TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.75deg]'];

export const NoteCard = ({ note, index = 0, className = '' }: NoteCardProps) => {
  const tilt = TILTS[index % TILTS.length];

  return (
    <article
      className={`group relative ${tilt} hover:rotate-0 transition-transform duration-200
                  bg-amber-50 dark:bg-stone-800/70
                  border border-amber-200/70 dark:border-stone-700
                  shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-12px_rgba(0,0,0,0.25)]
                  px-6 pt-7 pb-6 ${className}`}
    >
      {/* Tape */}
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-16
                   bg-stone-200/70 dark:bg-stone-600/50 border border-stone-300/40 dark:border-stone-600/40
                   rotate-[-2deg]"
      />

      <div className="flex items-center justify-between gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
        <time dateTime={note.date.toISOString()}>{formatDate(note.date)}</time>
        {note.source && (
          <a
            href={note.source}
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            via ↗
          </a>
        )}
      </div>

      {note.title && (
        <h3 className="font-display text-lg leading-snug text-stone-900 dark:text-stone-100 mb-2">
          {note.title}
        </h3>
      )}

      <MarkdownRenderer
        content={note.body}
        className="prose-sm prose-stone dark:prose-invert max-w-none
                   text-[15px] leading-relaxed text-stone-700 dark:text-stone-300"
      />
    </article>
  );
};
