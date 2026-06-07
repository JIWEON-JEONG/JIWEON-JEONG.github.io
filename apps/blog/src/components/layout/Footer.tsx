import { Link } from '@tanstack/react-router';

const socials: Array<{ label: string; href: string }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%A7%80%EC%9B%90-%EC%A0%95-4044b2234/' },
  { label: 'GitHub', href: 'https://github.com/JIWEON-JEONG' },
  { label: 'RSS', href: '/rss.xml' },
];

const linkCls =
  'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors';

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-stone-200 dark:border-stone-800">
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Identity + nav */}
          <div className="flex flex-col gap-3">
            <span className="font-display text-lg text-stone-800 dark:text-stone-200">
              정지원의 기록
            </span>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
              <Link to="/posts" className={linkCls}>
                Posts
              </Link>
            </nav>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] sm:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={linkCls}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-600">
              © {new Date().getFullYear()} Jiweon Jeong
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
