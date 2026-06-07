import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ENV } from '@/config/env';
import { useTheme } from '@/contexts/ThemeContext';
import { useLang } from '@/contexts/LangContext';

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex font-mono text-[11px] uppercase tracking-[0.16em]" role="group" aria-label="Content language">
      {(['ko', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2 py-1 transition-colors ${
            lang === l
              ? 'text-stone-900 dark:text-stone-100'
              : 'text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

interface HeaderProps {
  className?: string;
}

const ThemeToggle = () => {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? '🌙' : '☀️';
    }
    return theme === 'dark' ? '🌙' : '☀️';
  };

  const getThemeLabel = () => {
    const labels = {
      light: 'Light mode',
      dark: 'Dark mode', 
      system: 'System theme'
    };
    return labels[theme];
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200
                 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={getThemeLabel()}
    >
      <span className="text-lg">{getThemeIcon()}</span>
    </button>
  );
};

export const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 w-full bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-lg
                       border-b border-stone-200/50 dark:border-stone-700/50 shadow-sm shadow-stone-200/50 dark:shadow-stone-900/50 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-black text-stone-900 dark:text-white
                         transition-all duration-300 tracking-tight"
            >
              {ENV.SITE_TITLE}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                         transition-colors font-medium"
              activeProps={{
                className: 'text-stone-900 dark:text-white'
              }}
            >
              Home
            </Link>

            <Link
              to="/posts"
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                         transition-colors font-medium"
              activeProps={{
                className: 'text-stone-900 dark:text-white'
              }}
            >
              Posts
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* RSS Link */}
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center p-2 text-stone-500 dark:text-stone-400
                         rounded-md transition-colors hover:text-orange-500 dark:hover:text-orange-400"
              title="RSS Feed"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 11a9 9 0 0 1 9 9"/>
                <path d="M4 4a16 16 0 0 1 16 16"/>
                <circle cx="5" cy="19" r="1"/>
              </svg>
            </a>

            <LangToggle />

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200
                         rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                           hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors font-medium"
                activeProps={{
                  className: 'text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800'
                }}
              >
                Home
              </Link>

              <Link
                to="/posts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                           hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors font-medium"
                activeProps={{
                  className: 'text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800'
                }}
              >
                Posts
              </Link>

              {/* RSS Link for Mobile */}
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-stone-600 dark:text-stone-300
                           rounded-md transition-colors font-medium hover:text-orange-500 dark:hover:text-orange-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 11a9 9 0 0 1 9 9"/>
                  <path d="M4 4a16 16 0 0 1 16 16"/>
                  <circle cx="5" cy="19" r="1"/>
                </svg>
                RSS Feed
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};