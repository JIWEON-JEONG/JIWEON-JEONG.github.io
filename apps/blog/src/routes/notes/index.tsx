import { createFileRoute } from '@tanstack/react-router'
import { getLocalNotes } from '@q00-blog/shared'
import { NoteCard } from '@/components/blog/NoteCard'

export const Route = createFileRoute('/notes/')({
  component: NotesPage,
})

function NotesPage() {
  const notes = getLocalNotes()

  return (
    <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
      <header className="border-b border-stone-200 dark:border-stone-800 pb-5 mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400 dark:text-stone-500">
          Notes
        </p>
        <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-xl">
          Short, unpolished scraps — half-thoughts collected from elsewhere.
          Not essays. Don't read too much into them.
        </p>
      </header>

      {notes.length === 0 ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 py-12 text-center">
          Nothing pinned yet
        </p>
      ) : (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {notes.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
